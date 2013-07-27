var Request = require('../lib/request');

describe('request params', function() {
  it('should set a parameter into parameter stack', function() {
    var request = new Request();
    request.param('user', 'jack');
    request.parameter.user.should.eql('jack');
  })

  it('should build right params', function() {
    var request = new Request();
    request.param('user', 'jack');
    request.param('age', '20');
    request.buildParam().should.eql('user=jack&age=20');
  })

  it('should change request path', function() {
    var request = new Request();
    var url = 'http://app.io/user/add';
    request.set('url', url);
    request.param('name', 'jack');
    request.param('age', '20');
    request.request(function(data, res) {});
    request.option.path.should.eql('/user/add?name=jack&age=20');
  })
})

describe('request extends my-http', function() {
  it('should inherit "initProtocol" from my-http', function() {
    var request = new Request();
    request.initProtocol.should.be.a('function');
  })

  it('prototype should have "initProtocol"', function() {
    var request = new Request();
    request.__proto__.initProtocol.should.be.a('function');
  })

  it('prototype should have "request"', function() {
    var request = new Request();
    request.__proto__.request.should.be.a('function');
  })
})

describe('request request', function() {
  it('should make a http request', function(done) {
    var request = new Request();
    request.set('url', 'http://baidu.com');
    request.param('user', 'jack');
    request.request(function(data, res) {
      console.log(data);
      done();
    })
  })
})
