#!/usr/bin/env node

const fs = require('fs');
const Terser = require('terser');
const manifest = require('./manifest.json');

const scriptName = 'focus-scroll-content';
const outputPath = `dist/${scriptName}-${manifest.version}.js`;

let source = fs.readFileSync(`src/${scriptName}.js`, 'utf8');

// Replace module export to call the main function
source = source.replace(/\nexport default wrap;/, '\nwrap({verbose: true});');


Terser.minify(source).then(({ code: minifiedCode }) => {
  let code = minifiedCode;
  code = `(function(){${code}})()`;
  code = `javascript:${encodeURIComponent(code)}`;

  fs.writeFileSync(outputPath, code);
  console.log('Bookmarklet has been generated to:', outputPath);
}).catch(e => {
  console.error('Bookmarklet generate error:', e);
});
