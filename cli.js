#!/usr/bin/env node
'use strict';

const bold = require('ansi-bold');
const cyan = require('ansi-cyan');
const gray = require('ansi-gray');
const wrap = require('word-wrap');
const longest = require('longest');
const minimist = require('minimist');
const repeat = require('repeat-string');

const synonyms = require('./');

const args = minimist(process.argv.slice(2));

const words = args._;
const wordLen = longest(words).length + 3;
const results = synonyms(words);

for (let i = 0; i < words.length; i++) {
  let word = words[i];
  let nouns = results[word].nouns;
  let verbs = results[word].verbs;
  let output = cyan(word) + repeat(' ', wordLen - word.length);
  let indent = wordLen + 7;

  if (!nouns.length && !verbs.length) {
    output += gray('No synonyms found.') + '\n';
  }

  if (nouns.length) {
    output += bold('Nouns: ');
    nouns = wrap(nouns.join(', '), {indent: repeat(' ', indent)});
    output += gray(nouns.substr(indent)) + '\n';
  }

  if (verbs.length) {
    if (output.charAt(output.length - 1) === '\n') {
      output += repeat(' ', wordLen);
    }
    output += bold('Verbs: ');
    verbs = wrap(verbs.join(', '), {indent: repeat(' ', indent)});
    output += gray(verbs.substr(indent)) + '\n';
  }
  console.log(output);
}
