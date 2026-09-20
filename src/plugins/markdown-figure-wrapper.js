/**
 * Markdown-it plugin: Envolve imagens em <figure> e remove <p> desnecessário.
 * 
 * Input:  ![alt text](image.jpg)
 * Output: <figure><img src="image.jpg" alt="alt text"></figure>
 * 
 * Sem a <p> ao redor (que é inválida em HTML5).
 */
module.exports = function (md) {
  // Override image rendering to wrap in figure
  md.renderer.rules.image = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    const src = token.attrs.find(attr => attr[0] === 'src')?.[1] || '';
    const alt = token.content || '';
    
    return `<figure><img src="${src}" alt="${alt}"></figure>`;
  };

  // Add a post-processing rule to remove <p> wrapping <figure>
  const originalRender = md.renderer.render;
  md.renderer.render = function(tokens, options, env) {
    const html = originalRender.call(this, tokens, options, env);
    // Replace <p><figure> and </figure></p> with just <figure> and </figure>
    return html
      .replace(/<p><figure>/g, '<figure>')
      .replace(/<\/figure><\/p>/g, '</figure>');
  };
};
