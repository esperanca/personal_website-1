module.exports = (md) => {
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const info = token.info ? token.info.trim() : '';
    const language = info.split(/\s+/g)[0];

    if (language === 'mermaid') {
      return `<div class="mermaid">\n${token.content}\n</div>\n`;
    }

    return fence(tokens, idx, options, env, self);
  };
};
