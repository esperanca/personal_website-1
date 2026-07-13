const markdownItFootnote = require('markdown-it-footnote');

module.exports = function(md) {
  // Use the standard footnote plugin
  md.use(markdownItFootnote);

  // Store footnotes content
  const state = { footnotes: {} };

  // Override footnote_open to capture footnote content
  const originalFootnoteOpen = md.renderer.rules.footnote_open;
  md.renderer.rules.footnote_open = function(tokens, idx) {
    const label = tokens[idx].meta.label;
    return ''; // Don't render the footnote list item wrapper
  };

  // Capture footnote content
  const originalInline = md.renderer.rules.inline;
  md.renderer.rules.inline = function(tokens, idx, _options, env, renderer) {
    let result = '';
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === 'footnote_inline') {
        const label = token.meta.label;
        const content = token.content;
        state.footnotes[label] = content;
        result += `<label for="sn-${label}" class="sn-label">${label}</label><input type="checkbox" id="sn-${label}" class="sn-input"/><span class="sidenote"><span class="sn-num">${label}</span>${content}</span>`;
      } else {
        result += renderer.renderToken([token], i, {});
      }
    }
    return result;
  };

  // Override footnote_ref to create sidenote label
  md.renderer.rules.footnote_ref = function(tokens, idx) {
    const label = tokens[idx].meta.label;
    return `<label for="sn-${label}" class="sn-label">${label}</label><input type="checkbox" id="sn-${label}" class="sn-input"/>`;
  };

  // Remove footnote block rendering
  md.renderer.rules.footnote_block = function() {
    return '';
  };

  return md;
};
