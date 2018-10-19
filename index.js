const os = require('os');
let impl = null;

switch(os.type()) {
    case 'Darwin':
        impl = require('./impl/darwin');
        break;
    case 'Linux':
        impl = require('./impl/linux');
        break;
    case 'Windows_NT':
        impl = require('./impl/windows')
        break;
    default:
        throw new Error('Your OS is currently not supported by node-loudness.');
}

module.exports = {
    setVolume: function (volume, cb) {
        return impl.setVolume(volume, cb);
    },
    getVolume: function (cb) {
        return impl.getVolume(cb);
    },
    setMuted: function (muted, cb) {
        return impl.setMuted(muted, cb);
    },
    getMuted: function (cb) {
        return impl.getMuted(cb);
    }
};
