const markdownItFootnote = require('markdown-it-footnote');

module.exports = function(md) {
  md.use(markdownItFootnote);

  // Override footnote_anchor to create sidenote labels and inputs
  md.renderer.rules.footnote_anchor = function(tokens, idx, _options, env, renderer) {
    const n = Number(tokens[idx].meta.label).toString();
    return `<label for="sn-${n}" class="sn-label">${n}</label><input type="checkbox" id="sn-${n}" class="sn-input"/>`;
  };

  // Convert footnote block to sidenotes
  md.renderer.rules.footnote_block = function(tokens, idx) {
    let result = '';
    let footnotes = {};

    // First pass: extract footnote content
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'footnote_open') {
        const label = tokens[i].meta.label;
        const n = Number(label).toString();

        // Get content between footnote_open and footnote_close
        let content = '';
        let j = i + 1;
        while (j < tokens.length && tokens[j].type !== 'footnote_close') {
          if (tokens[j].type === 'inline') {
            content = tokens[j].content;
          }
          j++;
        }
        footnotes[n] = content;
        i = j;
      }
    }

    // Second pass: render as sidenotes
    for (const n in footnotes) {
      result += `<span class="sidenote"><span class="sn-num">${n}</span>${footnotes[n]}</span>`;
    }

    return result;
  };

  return md;
};
