Object.prototype.log = function() { console.log(this); return this; }
String.prototype.log = function() { console.log(String(this)); return this; }
module.exports = function() { console.log.apply(this,arguments) }