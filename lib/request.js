var MyHttp = require('my-http'),
    Paramer = require('../helper/paramer');

/*
  usage:
  var req = new Request();
  req.set('url', 'http://app.io/user/add:8080')
  req.set('method', 'POST')
  req.set('data', {user: 'Jack'});
  req.param('username', 'jack');
  req.param('password', 'applejuice');
  req.request(onComplete);
*/

/* inherit from MyHttp */
var Request = (function(Parent) {
  function constructor() {
    Parent.apply(this, arguments);

    this.parameter = {};

    this.request = function(onComplete) {
      var query = '';
      if (this.option.query) query += this.option.query + '&';
      query += this.buildParam();
      this.option.path = this.option.pathname + '?' + query;
      this.__proto__.request.apply(this, arguments);
    }

    /* set url query parameter */
    this.param = function(name, value) {
      this.parameter[name] = value;
      return this;
    }

    /* build all parameters as a query string */
    this.buildParam = function() {
      var paramer = new Paramer();
      for (key in this.parameter) {
        paramer.set(key, this.parameter[key]);
      }
      return paramer.build();    
    }
  }

  constructor.prototype = (function() {
    return this;
  }).call(new Parent);

  return constructor;
})(MyHttp)


module.exports = Request;
