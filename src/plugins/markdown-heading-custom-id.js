const CUSTOM_ID_RE = /\s*\{#[\w-]+\}\s*$/;

// Remove o sufixo `{#id}` (estilo Pandoc) do texto visível de um heading.
// O `slugify` passado ao markdown-it-anchor já ignora esse sufixo ao gerar
// o id — mas nada removia o texto literal do heading renderizado, então
// "## Introdução {#introducao}" aparecia na página como
// "Introdução {#introducao}".
module.exports = function (md) {
  md.core.ruler.after('inline', 'strip_heading_custom_id', function (state) {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'heading_open') continue;
      const inline = tokens[i + 1];
      if (!inline || inline.type !== 'inline' || !inline.children.length) continue;

      const last = inline.children[inline.children.length - 1];
      if (last.type !== 'text' || !CUSTOM_ID_RE.test(last.content)) continue;

      last.content = last.content.replace(CUSTOM_ID_RE, '');
      inline.content = inline.content.replace(CUSTOM_ID_RE, '');
    }
    return true;
  });
};
