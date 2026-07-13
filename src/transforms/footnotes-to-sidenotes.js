module.exports = function(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    // Match footnote references like <sup><a href="#fn1">1</a></sup>
    // and the corresponding footnote list items <li id="fn1">...</li>

    // Extract footnotes section
    const footnotesMatch = content.match(/<section class="footnotes">([\s\S]*?)<\/section>/);
    if (!footnotesMatch) return content;

    const footnotesSection = footnotesMatch[1];

    // Extract individual footnotes
    const footnoteRegex = /<li id="fn(\d+)">([\s\S]*?)<\/li>/g;
    const footnotes = {};
    let match;

    while ((match = footnoteRegex.exec(footnotesSection)) !== null) {
      const num = match[1];
      let content = match[2];
      // Remove backref link
      content = content.replace(/<a href="#fnref\d+"[^>]*>[\s\S]*?<\/a>/g, '');
      footnotes[num] = content.trim();
    }

    // Replace footnote references with sidenote markup
    let result = content;
    for (const num in footnotes) {
      const pattern = `<sup><a href="#fn${num}" class="footnote-ref">${num}</a></sup>`;
      const replacement = `<label for="sn-${num}" class="sn-label">${num}</label><input type="checkbox" id="sn-${num}" class="sn-input"/><span class="sidenote"><span class="sn-num">${num}</span>${footnotes[num]}</span>`;
      result = result.replace(pattern, replacement);
    }

    // Remove the footnotes section entirely
    result = result.replace(/<section class="footnotes">[\s\S]*?<\/section>/g, '');

    return result;
  }

  return content;
};
