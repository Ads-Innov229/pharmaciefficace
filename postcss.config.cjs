// @ts-check
const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const tailwindNesting = require('tailwindcss/nesting');

// Configuration PostCSS pour le projet
module.exports = {
  plugins: [
    postcssImport(),
    tailwindNesting(),
    tailwindcss({
      config: path.join(__dirname, 'tailwind.config.js'),
    }),
    autoprefixer({
      flexbox: 'no-2009'
    })
  ]
};
