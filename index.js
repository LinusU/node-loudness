const os = require('os')
let impl = null

switch (os.type()) {
  case 'Darwin':
    impl = require('./impl/darwin')
    break
  case 'Linux':
    impl = require('./impl/linux')
    break
  case 'Windows_NT':
    impl = require('./impl/windows')
    break
  default:
    throw new Error('Your OS is currently not supported by node-loudness.')
}

module.exports = {
  setVolume (volume, cb) {
    impl.setVolume(volume, cb)
  },
  getVolume (cb) {
    impl.getVolume(cb)
  },
  setMuted (muted, cb) {
    impl.setMuted(muted, cb)
  },
  getMuted (cb) {
    impl.getMuted(cb)
  }
}
