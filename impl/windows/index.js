const execa = require('execa')
const path = require('path')

const executablePath = path.join(__dirname, 'adjust_get_current_system_volume_vista_plus.exe')

function runProgram (...args) {
  return execa.stdout(executablePath, args)
}

function getVolumeInfo () {
  return runProgram().then((data) => {
    const args = data.split(' ')

    return { volume: parseInt(args[0], 10), isMuted: Boolean(parseInt(args[1], 10)) }
  })
}

exports.getVolume = function () {
  return getVolumeInfo().then(info => info.volume)
}

exports.setVolume = function (val) {
  return runProgram(String(val)).then(() => undefined)
}

exports.getMuted = function () {
  return getVolumeInfo().then(info => info.isMuted)
}

exports.setMuted = function (val) {
  return runProgram(val ? 'mute' : 'unmute').then(() => undefined)
}
