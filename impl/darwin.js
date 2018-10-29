const execa = require('execa')

function osascript (cmd) {
  return execa.stdout('osascript', ['-e', cmd], { preferLocal: false })
}

exports.getVolume = function () {
  return osascript('output volume of (get volume settings)').then(vol => parseInt(vol, 10))
}

exports.setVolume = function (val) {
  return osascript('set volume output volume ' + val).then(() => undefined)
}

exports.getMuted = function () {
  return osascript('output muted of (get volume settings)').then(mute => (mute === 'true'))
}

exports.setMuted = function (val) {
  return osascript('set volume ' + (val ? 'with' : 'without') + ' output muted').then(() => undefined)
}
