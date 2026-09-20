/**
 * Global data: Remove draft posts from output
 * Se draft: true, define permalink: false para não gerar arquivo
 */
module.exports = {
  eleventyComputed: {
    permalink(data) {
      if (data.draft) {
        return false;
      }
      return data.permalink;
    }
  }
};
