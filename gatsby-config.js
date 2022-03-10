require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'gatsby-ssr-image-cdn'
  },
  plugins: ['gatsby-plugin-image']
};
