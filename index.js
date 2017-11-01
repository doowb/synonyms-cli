'use strict';

var synonyms = require('synonyms');

module.exports = function(word) {
  var results = synonyms(word) || {};
  return {
    nouns: results.n,
    verbs: results.v
  };
};
