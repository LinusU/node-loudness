
var os = require('os');
var impl = null;

switch(os.type()) {
  case 'Darwin':
    impl = require('./impl/darwin');
    break;
  case 'Linux':
    impl = require('./impl/linux');
    break;
  default:
    throw new Error('Your OS is currently not supported by node-loudness.');
}

module.exports = {
  setVolume: function (volume, cb) {
    impl.setVolume(volume, cb);
  },
  getVolume: function (cb) {
    impl.getVolume(cb);
  },
  setMuted: function (muted, cb) {
    impl.setMuted(muted, cb);
  },
  getMuted: function (cb) {
    impl.getMuted(cb);
  }
};
