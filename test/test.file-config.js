const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const Config = require('../');
const logger = {
  debug(){},
  info(){},
  warn(){},
  error(){},
  critical(){}
};

describe('Config', ()=>{
  it('Should be able to create an instance', (done)=>{
    const config = new Config(null, {logger});
    expect(config).to.be.an.object();
    expect(config.get).to.be.a.function();
    expect(config.set).to.be.a.function();
    expect(config.remove).to.be.a.function();
    return done();
  });

  it('Should be able to get a configuration value', (done)=>{
    const config = new Config(null, {logger, base: {some: 'value'}});
    const val = config.get('some');
    expect(val).to.be.a.string().and.to.equal('value');
    return done();
  });

  it('Should be able to set a configuration value', (done)=>{
    const config = new Config(null, {logger});
    const init = config.get('some');
    expect(init).to.be.undefined();
    config.set('some', 'value');
    const setVal = config.get('some');
    expect(setVal).to.be.a.string().and.to.equal('value');
    return done();
  });

  it('Should be able to remove a configuration value', (done)=>{
    const config = new Config(null, {logger, base: {some: 'value'}});
    const val = config.get('some');
    expect(val).to.be.a.string().and.to.equal('value');
    config.remove('some');
    const setVal = config.get('some');
    expect(setVal).to.be.undefined();
    return done();
  });

  it('Should be able to load a configuration file', (done)=>{
    const config = new Config(require('path').join(__dirname, 'test.config'), {logger});
    const val = config.get('some');
    expect(val).to.be.a.string().and.to.equal('value');
    return done();
  });
});
