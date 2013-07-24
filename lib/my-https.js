/* @author shallker.wang@profero.com */

var HTTPS = require('https'),
    URL = require('url'),
    Bupper = require('bupper');

/* my node http interface */
var MyHttps = (function() {
  
  function constructor() {
    this._callbacks = {};
    this._options = {};
  }

  constructor.prototype = (function() {

    this.set = function(name, value) {
      if (this.set[name]) return this.set[name](value);
      this._options[name] = value;
      return this;
    }

    this.set.url = function(url) {
      var parse = URL.parse(url);
      this.set('hostname', parse.hostname);
      this.set('port', parse.port);
      this.set('path', parse.path);
      return this;
    }

    this.setHeader = function(name, value) {
      if (! this._options.headers) this._options.headers = {};
      this._options.headers[name] = value;
    }

    this.on = function(event, callback) {
      this._callbacks[event] = callback;
    }

    this.request = function(onComplete) {
      this.log('this._options', this._options);
      onComplete = onComplete ? onComplete : this._callbacks['complete'];
      var req = HTTPS.request(this._options, onResponse.bind(this));
      if (this._callbacks.error) req.on('error', this._callbacks.error);
      if (this._options.data) req.write(this._options.data);
      req.end();

      function onResponse(res) {
        if (this._callbacks.response) this._callbacks.response(res.statusCode, res);
        res.on('data', function(chunk) {
          Bupper.add(chunk);
        });
        res.on('end', function() {
          var buff = Bupper.combine();
          if (onComplete) onComplete(buff.toString(), res);
        });
      }

    }

    this.log = function() {
      if (this.debug) {
        var args = [].slice.call(arguments);
        args.unshift('MyHttps');
        console.log.apply(console, args);
      }
    }

    return this;
  }).call({});

  return constructor;
})();

module.exports = MyHttps;
