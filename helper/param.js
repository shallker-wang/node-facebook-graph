/* @author shallker.wang@profero.com */

var Param = function() {
  this.args = {};
  
  this.set = function(name, value) {
    this.args[name] = value;
    return this;
  }

  this.toArray = function() {
    var arr = [];
    for (var i in this.args) {
      arr.push(i + '=' + this.args[i]);
    }
    return arr;
  }

  this.build = function() {
    var str = this.toArray().join('&');
    this.args = {};
    return str;
  }

  this.parse = function(str) {
    var params = str.split('&');
    var result = {};
    for (var i in params) {
      var arr = params[i].split('=');
      result[arr.shift()] = arr.shift();
    }
    return result;
  }

};

module.exports = new Param();
