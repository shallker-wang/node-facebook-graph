node-facebook-graph
==========

Facebook Graph API in Nodejs.

### Dummy steps
1, Install and require this package.
```javascript
var FacebookGraph = require('facebook-graph');
```

2, Create an instance with your Facebook access token.
```javascript
var fbGraph = new FacebookGraph(access_token);
```

3, Start to make your API calls.
```javascript
fbGraph.api('/me', function(data) {
  console.log('Hello, ' + data.name);
})
```

### Todo
* write a test
