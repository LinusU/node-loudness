var os = require('os');
var impl = null;
switch (os.type()) {
    case 'Darwin':
        impl = require('./impl/darwin.js');
        break;
    case 'Linux':
        impl = require('./impl/ubuntu_14.04.js');
        break;
    default:
        throw new Error('Your OS is currently not supported by node-loudness.');
}

module.exports = {
    setVolume: function(volume, cb) {
        impl.setVolume(volume, cb);
    },
    toggleMuted: function(cb) {
        impl.toggleMuted(cb);
    }
};
