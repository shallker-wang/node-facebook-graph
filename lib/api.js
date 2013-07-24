var MyHttps = require('./my-https');

function API() {

  this.methodsAllowed = ['GET', 'PUT', 'POST', 'DELETE'];

  this.param = {};

  this.option = {};
  this.option.host = '';
  this.option.path = '';
  this.option.data = '';
  this.option.method = 'GET';

  this.set = function(name, value) {
    this.param[name] = value;
    return API;
  }

  this.method = function(method) {
    if (this.methodsAllowed.indexOf(method) === -1) {
      throw new Error 'method ' + method + ' is not allowed'
    }
    this.option.method = method;
    return API;
  }

  this.fields = function(fields) {
    this.param.fields = fields.join(',');
    return API;
  }

  this.access_token = function(token) {
    this.param.access_token = token;
    return API;
  }

  this.pretty = function(yes) {
    if (yes) this.param.pretty = '0';
    else this.param.pretty = '1';
    return API;
  }

  this.data = function(data) {
    this.option.data = data;
    return API;
  }

  this.request = function(onComplete) {
    onComplete = onComplete || function() {};
    var paramer = new Paramer();
    for (key in this.param) {
      paramer.set(key, this.param[key]);
    }
    var https = new MyHttps();
    https.set('url', this.option.graph + this.option.path + '?' + paramer.build());
    https.set('method', this.option.method);
    if (this.option.data) https.set('data', this.option.data);
    https.request onComplete;
  }
  
}

module.exports = API;
