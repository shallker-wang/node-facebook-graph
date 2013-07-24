/* @author shallker.wang@profero.com */

var API = require('./api');

function FacebookGraph(token) {

  this.token = token;

  this.graph = 'https://graph.facebook.com';

  this.api = function(path) {
    var api = new API();
    api.set('pretty', '0');
    api.set('method', 'get');
    api.set('access_token', this.token);
    return api;
  }

}

module.exports = FacebookGraph;
