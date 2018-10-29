const { spawn } = require('child_process')
const path = require('path')

const executable = path.join(__dirname, 'adjust_get_current_system_volume_vista_plus.exe')

const runProgram = function (args, done) {
  args = args === '' ? [] : args.toString().split(' ')
  done = done || function () {}

  let ret = ''
  let err = null
  const p = spawn(executable, args)

  p.stdout.on('data', function (data) {
    ret += data
  })

  p.stderr.on('data', function (data) {
    err = new Error('Windows Script Error: ' + data)
  })

  p.on('close', function () {
    if (err) return done(err)

    return done(null, ret.trim())
  })
}

const getVolumeInfo = function (done) {
  done = done || function () {}

  runProgram('', function (err, strArgs) {
    if (err) return done(err)

    const args = strArgs.split(' ')
    const info = {
      volume: parseInt(args[0]),
      isMuted: !!parseInt(args[1])
    }

    return done(null, info)
  })
}

module.exports.getVolume = function (done) {
  done = done || function () {}

  getVolumeInfo(function (err, info) {
    if (err) return done(err)

    return done(null, info.volume)
  })
}

module.exports.setVolume = function (val, done) {
  val = val || 0
  done = done || function () {}

  runProgram(val, function (err) {
    if (err) return done(err)

    return done(null)
  })
}

module.exports.getMuted = function (done) {
  done = done || function () {}

  getVolumeInfo(function (err, info) {
    if (err) return done(err)

    return done(null, info.isMuted)
  })
}

module.exports.setMuted = function (val, done) {
  val = val ? 'mute' : 'unmute'
  done = done || function () {}

  runProgram(val, function (err) {
    if (err) return done(err)

    return done(null)
  })
}
