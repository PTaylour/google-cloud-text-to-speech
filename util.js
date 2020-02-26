const player = require("play-sound")((opts = {}));
const fs = require("fs");
const util = require("util");

/**
 * util for writing a file
 */
const writeFile = util.promisify(fs.writeFile);

/**
 * player.play with a promise wrapped round it
 * @param {string} what
 * @param {*} options
 */
const playSoundFile = (what, options) =>
  new Promise((resolve, reject) => {
    player.play(what, options, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

module.exports = {
  writeFile,
  playSoundFile
};
