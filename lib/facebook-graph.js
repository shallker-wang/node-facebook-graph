/* @author shallker.wang@profero.com */

var https = require('https'),
    Bupper = require('bupper'),
    Param = require('../helper/param');

var FacebookGraph = (function() {
  function constructor(token) {
    this.token = token;
  }

  constructor.prototype = (function() {
    this.graph = 'https://graph.facebook.com';

    this.api = function(uri, onComplete) {
      https.get(this.initURL(uri), function(res) {
        res.on('data', function(chunk) {
          Bupper.add(chunk);
        }).on('end', function() {
          onComplete(Bupper.combine().toString('utf8'));
        });
      })
    }

    this.initURL = function(uri) {
      Param
        .set('method', 'get')
        .set('pretty', '0')
        .set('access_token', this.token);
      return this.graph + uri + '?' + Param.build();      
    }

    return this;
  }).call({});

  return constructor;
})();

module.exports = FacebookGraph;
