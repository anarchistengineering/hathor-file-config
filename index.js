const path = require('path');
const fs = require('fs');
const {
  camelKeys,
  getObjectValue,
  setObjectValue,
  removeObjectValue,
  keyToPath
} = require('hathor-utils');

const loadConfigFrom = (configFile, {logger, base})=>{
  if(!configFile){
    logger.warn(`No configuration file specified, using base configuration.`, base);
    return base;
  }
  const configFileLocation = path.join(process.cwd(), configFile);
  logger.info(`Loading configuration from:`, `${configFileLocation}`);
  try{
    return camelKeys(Object.assign({}, base, require(configFileLocation)));
  }catch(e){
    const src = fs.readFileSync(configFile).toString();
    const f = new Function(`base`, `let module = {}, exports; ${src}; return Object.assign({}, base, module.exports || exports);`);
    return camelKeys(f());
  }
};

class Config{
  constructor(configFile, options){
    const {
      logger = require('hathor-logger'),
      base = {}
    } = options || {};
    this.CONFIG = loadConfigFrom(configFile, {logger, base});
  }

  get(key, defaultValue){
    return getObjectValue(keyToPath(key), this.CONFIG, defaultValue);
  }

  set(key, value){
    this.CONFIG = setObjectValue(keyToPath(key), this.CONFIG, value);
  }

  remove(key){
    this.CONFIG = removeObjectValue(keyToPath(key), this.CONFIG);
  }
};

module.exports = Config;
