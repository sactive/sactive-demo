const fs = require('fs');
const mkp = require('mkdirp');

function mkdirp(dirpath) {
  if (!fs.existsSync(dirpath)) {
    mkp.sync(dirpath);
  }
}

function envs(name) {
  return process.env[name] || null;
}

module.exports = {
  mkdirp,
  envs
};
