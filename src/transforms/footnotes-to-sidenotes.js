module.exports = function(content, outputPath) {
  // Only process HTML files
  if (!outputPath || !outputPath.endsWith('.html')) {
    return content;
  }

  // Check if this is a livro page
  if (!outputPath.includes('livro')) {
    return content;
  }

  // Extract footnotes section
  const footnotesMatch = content.match(/<section class="footnotes">([\s\S]*?)<\/section>/);
  if (!footnotesMatch) {
    return content;
  }

  const footnotesSection = footnotesMatch[1];
  const footnotes = {};

  // Extract individual footnotes: <li id="fn1">content <a href="#fnref1">↩︎</a></li>
  const footnoteRegex = /<li id="fn(\d+)"\s*>\s*([\s\S]*?)\s*<a href="#fnref/g;
  let match;

  while ((match = footnoteRegex.exec(footnotesSection)) !== null) {
    const num = match[1];
    let noteContent = match[2].trim();

    // Clean up any extra HTML/whitespace
    noteContent = noteContent.replace(/\s+/g, ' ').trim();
    footnotes[num] = noteContent;
  }

  // Replace footnote references with sidenote markup
  let result = content;

  for (const num in footnotes) {
    // Match: <sup><a href="#fn1" class="footnote-ref">1</a></sup>
    const refPattern = `<sup><a href="#fn${num}" class="footnote-ref">${num}</a></sup>`;
    const sidenoteMarkup = `<label for="sn-${num}" class="sn-label">${num}</label><input type="checkbox" id="sn-${num}" class="sn-input"/><span class="sidenote"><span class="sn-num">${num}</span>${footnotes[num]}</span>`;

    result = result.split(refPattern).join(sidenoteMarkup);
  }

  // Remove the entire footnotes section
  result = result.replace(/<section class="footnotes">[\s\S]*?<\/section>\n?/g, '');

  return result;
};
