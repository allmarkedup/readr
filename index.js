const path = require('path');
const Promise = require('bluebird');
const stat = Promise.promisify(require('fs').stat);
const readdir = Promise.promisify(require('fs').readdir);

module.exports = function read(dir) {
    return readdir(dir)
    .map(name => {
        const filePath = path.join(dir, name);
        return stat(filePath).then(stats => {
            return stats.isDirectory() ? read(filePath).then(paths => [filePath, ...paths]) : filePath;
        });
    })
    .filter(f => f) // remove empty items
    .reduce((a, b) => a.concat(b), []); // flatten nested arrays
};
