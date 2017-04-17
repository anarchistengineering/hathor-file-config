const path = require('path');
const fs = require('fs');
const {
  camelKeys,
  getObjectValue,
  setObjectValue,
  removeObjectValue,
  keyToPath
} = require('hathor-utils');
const Config = require('hathor-config');

const loadConfigFrom = (configFile, {logger, base})=>{
  if(!configFile){
    logger.warn(`No configuration file specified, using base configuration.`, base);
    return base;
  }
  const configFileLocation = path.join(process.cwd(), configFile);
  logger.info(`Loading configuration from:`, `${configFileLocation}`);
  try{
    return camelKeys(Object.assign({}, base, require(configFileLocation)));
  }catch(e1){
    try{
      const src = fs.readFileSync(configFile).toString();
    }catch(e2){
      return logger.error(configFile, e1);
    }
    try{
      const f = new Function(`base`, `let module = {}, exports; ${src}; return Object.assign({}, base, module.exports || exports);`);
      return camelKeys(f(base));
    }catch(e){
      return logger.error(configFile, e);
    }
  }
};

class FileConfig extends Config{
  constructor(configFile, options){
    const {
      logger = require('hathor-logger'),
      base = {}
    } = options || {};
    const config = loadConfigFrom(configFile, {logger, base});
    super(config, options);
  }
};

module.exports = FileConfig;
