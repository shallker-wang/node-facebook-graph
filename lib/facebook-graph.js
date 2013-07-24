/* @author shallker.wang@profero.com */

var Request = require('./request');

function FacebookGraph(token) {

  this.token = token;

  this.graph = 'https://graph.facebook.com';

  this.api = function(path) {
    var req = new Request();
    req.url = this.graph + path;
    req.param('pretty', '0');
    req.param('method', 'GET');
    req.param('access_token', this.token);
    return req;
  }

}

module.exports = FacebookGraph;
