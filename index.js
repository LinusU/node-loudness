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
  setVolume (volume, d, c) {
    return impl.setVolume(volume, d, c)
  },
  getVolume (d, c) {
    return impl.getVolume(d, c)
  },
  setMuted (muted, d, c) {
    return impl.setMuted(muted, d, c)
  },
  getMuted (d, c) {
    return impl.getMuted(d, c)
  }
}
