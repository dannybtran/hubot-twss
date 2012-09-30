var n = require('natural')

Array.prototype.bigram = function() {
  var bigrams = n.NGrams.bigrams(this)
  bigrams = bigrams.map(function(bg) { return String(bg) })
  return this.concat(bigrams);
}