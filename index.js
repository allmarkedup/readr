const path = require('path');
const fs = require('fs');
const Bluebird = require('bluebird');

const stat = Bluebird.promisify(fs.stat);
const readdir = Bluebird.promisify(fs.readdir);

module.exports = function read(dir, filter) {
  filter = filter || (() => true);
  return readdir(dir)
    .map(name => {
      const filePath = path.join(dir, name);
      return stat(filePath).then(stats => {
        if (stats.isDirectory()) {
          return read(filePath, filter).then(paths => {
            if (filter(filePath, stats)) {
              return [filePath, ...paths];
            }
            return paths;
          });
        }
        if (filter(filePath, stats)) {
          return filePath;
        }
      });
    }).reduce((a, b) => b ? a.concat(b) : a, []); // remove empty items and flatten nested arrays
};
