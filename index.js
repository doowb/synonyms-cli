'use strict';

var synonyms = require('synonyms');

module.exports = function(words) {
  const results = {};

  words = arrayify(words);
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let found = synonyms(word) || {};
    results[word] = {
      nouns: arrayify(found.n),
      verbs: arrayify(found.v)
    };
  }

  return results;
};

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}
