Hathor File Configuration Provider
===

Used to provide configuration values to a Hathor application, plugins, and routes from a JavaScript or JSON source file.

Install
---

```
npm install --save hathor-file-config
```

Usage
---

```js
const {Server} = require('hathor');
const Config = require('hathor-config');
const FileConfig = require('hathor-file-config');
const logger = require('hathor-logger');

const config = new Config();
config.merge(new FileConfig('config/config'));
config.set('server.logger', logger);

const serverConfig = config.get('server', {});
const server = new Server(serverConfig);

server.start((err)=>{
  logger.error(err);
  process.exit(1);
});
```

API
---

Extends [Hathor Configuration Provider](https://github.com/anarchistengineering/hathor-config)

### Config.create(configurationFileName, options)

Attempts to to load the configuration values from configurationFileName.  The first attempt is performed as loading using require(), if that fails then the configuration file is processed as a JSON raw string.  If both fail an error is thrown.

Introduces options.base as the base configuration object to utilize.
