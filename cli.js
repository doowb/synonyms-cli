#!/usr/bin/env node
'use strict';

const args = require('minimist')(process.argv.slice(2));
const synonyms = require('./');

const results = {};
for (let i = 0; i < args._.length; i++) {
  let word = args._[i];
  results[word] = synonyms(word);
}

for (let i = 0; i < args._.length; i++) {
  let word = args._[i];
  console.log(`${word}:`);
  if (typeof results[word].nouns === 'undefined' && typeof results[word].verbs === 'undefined') {
    console.log(`  No results found.`);
  }

  if (typeof results[word].nouns !== 'undefined') {
    console.log(`  Nouns: ${results[word].nouns.join(', ')}`);
    console.log();
  }

  if (typeof results[word].verbs !== 'undefined') {
    console.log(`  Verbs: ${results[word].verbs.join(', ')}`);
    console.log();
  }

  console.log();
}
