var stemmer = require('natural').PorterStemmer

String.prototype.stem = function() {
  return stemmer.stem(String(this));
}

Array.prototype.stem = function() {
  var   self = this
      , results = []
  self.forEach(function(e,i) {
    if (typeof e == "string") {
      results[i] = e.stem()
    } else {
      results[i] = e
    }
  })
  return results;
}