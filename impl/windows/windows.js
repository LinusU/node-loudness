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

var getVolume = function(done) {
	done = done || function () {};

	runProgram('', function(err, vol) {
		if (err) return done(err);

		return done(null, parseInt(vol));
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

	getVolume(function(err, volume) {
		if (err) return done(err);

		return done(null, volume === 0);
	});
};

var setMuted = function(val, done) {
	val = val ? '0' : '100';
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
