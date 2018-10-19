const { execFile } = require('child_process');
const path = require('path');

const executable = path.join(__dirname, 'adjust_get_current_system_volume_vista_plus.exe');

function runProgram(args, done) {
	args = args === '' ? [] : args.toString().split(' ');
	done = done || function () {};

	return new Promise((resolve, reject) => {
		execFile(executable, args, (err, stdout, stderr) => {
			if (err) {
				const err = new Error('Windows Script Error:', error);
				reject(err);
			} else if (stderr) {
				const err = new Error('Windows Script Error:', error);
				reject(err);
			} else {
				resolve(stdout.trim());
			}
		});
	});
};

async function getVolumeInfo() {
	const result = await runProgram('');
	const args = result.split(' ');
	return {
		volume: parseInt(args[0]),
		isMuted: parseInt(args[1]) ? true : false,
	}
};

async function getVolume() {
	const info = await getVolumeInfo();
	return info.volume;
}

function setVolume(val) {
	val = val || 0;
	return runProgram(val);
}

async function getMuted() {
	const info = await getVolumeInfo();
	return info.isMuted;
}

function setMuted(val) {
	val = val ? 'mute' : 'unmute';
	return runProgram(val);
}

module.exports = {
	getVolume,
	setVolume,
	getMuted,
	setMuted,
};
