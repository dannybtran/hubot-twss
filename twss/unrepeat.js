String.prototype.unrepeat = function() {
  var t = String(this)
  // check for 3+ duplicated letters
  while(matches = /(.)\1{2,}/.exec(t)) {
    t = t.replace(matches[0],matches[1])
  }
  return t;
}