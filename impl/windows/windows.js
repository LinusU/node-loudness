var spawn = require('child_process').spawn;
var path = require('path');

var executable = path.join(__dirname, 'adjust_get_current_system_volume_vista_plus.exe');

var runProgram = function(args, done) {
	args = args === '' ? [] : args.toString().split(' ');
	done = done || function () {};

	var ret = '';
	var err = null;
	var p = spawn(executable, args);

	p.stdout.on('data', function (data) {
		ret += data;
	});

	p.stderr.on('data', function (data) {
		err = new Error('Windows Script Error: ' + data);
	});

	p.on('close', function () {
		if (err) return done(err);

		return done(null, ret.trim());
	});
};

var getVolumeInfo = function(done) {
	done = done || function () {};

	runProgram('', function(err, strArgs) {
		if (err) return done(err);

		const args = strArgs.split(' ');
		const info = {
			volume: parseInt(args[0]),
			isMuted: parseInt(args[1]) ? true : false
		};

		return done(null, info);
	});
};

var getVolume = function(done) {
	done = done || function () {};

	getVolumeInfo((err, info) => {
		if (err) return done(err);

		return done(null, info.volume);
	});
};

var setVolume = function(val, done) {
	val = val || 0;
	done = done || function () {};

	runProgram(val, function(err) {
		if (err) return done(err);

		return done(null);
	});
};

var getMuted = function(done) {
	done = done || function () {};

	getVolumeInfo((err, info) => {
		if (err) return done(err);

		return done(null, info.isMuted);
	});
};

var setMuted = function(val, done) {
	val = val ? 'mute' : 'unmute';
	done = done || function () {};

	runProgram(val, function(err) {
		if (err) return done(err);

		return done(null);
	});
};

module.exports = {
	getVolume: getVolume,
	setVolume: setVolume,
	getMuted: getMuted,
	setMuted: setMuted
};
