var n = require('natural')

String.prototype.tokenize = function() {
  var tokenizer = new n.TreebankWordTokenizer()
  var tokens = tokenizer.tokenize(String(this));
  tokens = tokens.map(function(t) {
    switch(t) {
      case "'ll": return "will";  break
      case "'m":  return "am";    break
      case "'re": return "are";   break
      case "'d":  return "would"; break
      case "'ve": return "have";  break
      case "'s":  return "is";    break
      case "'t":  return "not";   break
      case "n't":  return "not";   break
    }
    return t;
  })
  return tokens.filter(function(t) {
    return t[0].match(/[a-zA-Z]/);
  })
}