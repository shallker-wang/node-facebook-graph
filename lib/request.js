var MyHttps = require('./my-https'),
    Paramer = require('../helper/paramer');

/*
  useage:
  var req = new Request();
  req.url = 'http://app.io/user/add:8080'
  req.param('username', 'jack');
  req.param('password', 'applejuice');
  req.method = 'POST';
  req.data = '';
  req.request();
*/
function Request() {

  this.methodsAllowed = ['GET', 'PUT', 'POST', 'DELETE'];

  this.parameter = {};

  this.url = '';
  this.data = '';
  this.method = 'GET';

  this.param = function(name, value) {
    this.parameter[name] = value;
    return this;
  }

  this.request = function(onComplete) {
    onComplete = onComplete || function() {};
    var https = new MyHttps();
    https.debug = true;
    https.set('url', this.buildURL());
    https.set('method', this.method);
    if (this.data) https.set('data', this.data);
    https.on('error', function(err) {
      console.log('https on error', err);
    })
    https.request(onComplete);
  }

  this.buildParam = function() {
    var paramer = new Paramer();
    for (key in this.parameter) {
      paramer.set(key, this.parameter[key]);
    }
    return paramer.build();    
  }

  this.buildURL = function() {
    return this.url + '?' + this.buildParam();
  }
  
}

module.exports = Request;
