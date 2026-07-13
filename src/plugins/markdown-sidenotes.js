const markdownItFootnote = require('markdown-it-footnote');

module.exports = function(md) {
  md.use(markdownItFootnote);

  // Store original footnote rendering
  const defaultRender = md.renderer.rules.footnote_block || ((tokens, idx) => '');
  const defaultFnOpenRender = md.renderer.rules.footnote_open || ((tokens, idx) => '<li>');
  const defaultFnCloseRender = md.renderer.rules.footnote_close || ((tokens, idx) => '</li>');

  // Convert footnote anchors to sidenote labels
  md.renderer.rules.footnote_anchor = function(tokens, idx) {
    const n = Number(tokens[idx].meta.label).toString();
    return `<label for="sn-${n}" class="sn-label">${n}</label><input type="checkbox" id="sn-${n}" class="sn-input"/>`;
  };

  // Convert footnote reference to sidenote span
  md.renderer.rules.footnote_ref = function(tokens, idx) {
    const n = Number(tokens[idx].meta.label).toString();
    const content = tokens[idx].content || n;
    return `<label for="sn-${n}" class="sn-label">${content}</label><input type="checkbox" id="sn-${n}" class="sn-input"/>`;
  };

  // Render footnote block as sidenotes
  md.renderer.rules.footnote_block = function(tokens, idx) {
    let result = '';

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'footnote_open') {
        const label = tokens[i].meta.label;
        const n = Number(label).toString();

        // Find the content of this footnote
        let content = '';
        let j = i + 1;
        while (j < tokens.length && tokens[j].type !== 'footnote_close') {
          if (tokens[j].type === 'inline') {
            content = md.utils.escapeHtml(tokens[j].content);
          }
          j++;
        }

        result += `<span class="sidenote"><span class="sn-num">${n}</span>${content}</span>`;
        i = j; // Skip to end of footnote
      }
    }

    return result;
  };

  return md;
};
