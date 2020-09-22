const execa = require('execa')

async function amixer (...args) {
	console.log(args)
  return (await execa('amixer', args)).stdout
}

let defaultDeviceCache = null
const reDefaultDevice = /Simple mixer control '([a-z0-9 -]+)',[0-9]+/i

function parseDefaultDevice (data) {
  const result = reDefaultDevice.exec(data)

  if (result === null) {
    throw new Error('Alsa Mixer Error: failed to parse output')
  }

  return result[1]
}

async function getDefaultDevice () {
  if (defaultDeviceCache) return defaultDeviceCache

  return (defaultDeviceCache = parseDefaultDevice(await amixer()))
}

const reInfo = /[a-z][a-z ]*: Playback [0-9-]+ \[([0-9]+)%\] (?:[[0-9.-]+dB\] )?\[(on|off)\]/i

async function buildArgs(cmd, device, card){
	var res = [cmd]
	res.push(!!device ? device : await getDefaultDevice())
	if(card){
		res.push('-c')
		res.push(card)
	}
	return res
}

function parseInfo (data) {
  const result = reInfo.exec(data)

  if (result === null) {
    throw new Error('Alsa Mixer Error: failed to parse output')
  }

  return { volume: parseInt(result[1], 10), muted: (result[2] === 'off') }
}

async function getInfo (device, card) {
	var a = buildArgs('get', device, card)
	console.log(a)
	console.log(await amixer.apply(null, a))
  return parseInfo(await amixer.apply(null, a))
}

exports.getVolume = async function getVolume(device, card) {
  return (await getInfo(device, card)).volume
}

exports.setVolume = async function setVolume (val, device, card) {
  var args = buildArgs('set',device, card)
  args.push(val + '%')
  await amixer.apply(null, args)
}

exports.getMuted = async function getMuted (device, card) {
  return (await getInfo(device, card)).muted
}

exports.setMuted = async function setMuted (val, device, card) {
  var args = buildArgs('set',device, card)
  args.push(val ? 'mute' : 'unmute')
  await amixer.apply(null, args)
}
