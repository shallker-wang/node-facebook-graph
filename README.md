node-facebook-graph
==========

Facebook Graph API in Nodejs.

## Installation
Use npm:
```shell
npm install git://github.com/shallker-wang/node-facebook-graph.git
```

Or add to your package dependencies:
```json
{
  "dependencies": {
    "node-facebook-graph": "git://github.com/shallker-wang/node-facebook-graph.git"
  }
}
```

### Quick Start
Require and create an instance with your Facebook access token:
```javascript
var FacebookGraph = require('node-facebook-graph');
var fbGraph = new FacebookGraph(access_token);
```

Start to make your API calls:
```javascript
var api = fbGraph.api('/me');
api.pretty(true);
api.method('GET');
api.fields(['picture', 'gender', 'name']);
api.request(function(result, https) {
  console.log(result);
})
```

### Todo
* write a test
