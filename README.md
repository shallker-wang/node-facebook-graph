node-facebook-graph
==========

Facebook Graph API in Nodejs.

## Installation
```shell
npm install git://github.com/shallker-wang/node-facebook-graph.git
```

### Quick Start
Require and create an instance with your Facebook access token:
```javascript
var FacebookGraph = require('node-facebook-graph');
var fbGraph = new FacebookGraph(access_token);
```

Start to make your API calls:
```javascript
fbGraph.api('/me', function(data) {
  console.log('Hello, ' + data.name);
})
```

### Todo
* write a test
