require('./log')
require('./unrepeat')
require('./tokenize')
require('./stop')
require('./stem')
require('./bigram')

var   fs = require('fs')
    , natural  = require('natural')

var Klassifier = function() {
  var   self = this
      , limit = 1
      , classifier = new natural.BayesClassifier()

  self.add = function(comment,klass,i) {
    if (i%100 == 0) { process.stdout.write(i + "...") }

    var grams = self.preproc(comment)

    if (grams && grams.length) { classifier.addDocument(grams,klass) }
  }

  self.msg = function(klass,len) {
    ("Training class \"" + klass + "\" " + len + " items...").log()
  }

  self.train = function(cb) {
    var   positive = String(fs.readFileSync('./training/twss.txt')).split('\n')
        , negative = String(fs.readFileSync('.//training/non_twss.txt')).split('\n')
        , i = 0, len = 0

    self.msg('positive',positive.length)
    for(i = 0, len = positive.length; i < len; i++) { self.add(positive[i],'positive',i) }

    "done.".log()

    self.msg('negative',negative.length)
    for(i = 0, len = negative.length; i < len; i++) { self.add(negative[i],'negative',i) }

    "done.".log()

    process.stdout.write("Training...")

    classifier.train()

    classifier.save(self.file, function(err, classifier) {
      ".".log()
      String(self.file + " saved!").log()
      cb()
    })
  }

  self.preproc = function() {
    // override this
  }

  return self;
}

var KlassifierA = function() {
  var self = new Klassifier()

  self.preproc = function(comment) {
    return comment.unrepeat()
                  .tokenize()
                  .stop()
                  .stem()
                  .bigram()
  }

  return self;
}


var KlassifierA1 = function() {
  var self = new KlassifierA()
  self.file = 'classifier-twss.json'
  return self;
}

var a1   = new KlassifierA1  ()
a1.train(function() {})
