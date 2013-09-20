
var spawn = require('child_process').spawn;

var amixer = function (args, cb) {

  var ret = '';
  var err = null;
  var p = spawn('amixer', args);

  p.stdout.on('data', function (data) {
    ret += data;
  });

  p.stderr.on('data', function (data) {
    err = new Error('Alsa Mixer Error: ' + data);
  });

  p.on('close', function () {
    cb(err, ret.trim());
  });

};

var reInfo = /[a-z][a-z ]*\: Playback [0-9-]+ \[([0-9]+)\%\] [[0-9\.-]+dB\] \[(on|off)\]/i;
var getInfo = function (cb) {
  amixer(['get', 'PCM'], function (err, data) {
    if(err) {
      cb(err);
    } else {
      var res = reInfo.exec(data);
      if(res === null) {
        cb(new Error('Alsa Mixer Error: failed to parse output'));
      } else {
        cb(null, {
          volume: parseInt(res[1], 10),
          muted: (res[2] == 'off')
        });
      }
    }
  });
};

module.exports.getVolume = function (cb) {
  getInfo(function (err, obj) {
    if(err) {
      cb(err);
    } else {
      cb(null, obj.volume);
    }
  });
};

module.exports.setVolume = function (val, cb) {
  amixer(['set', 'PCM', val + '%'], function (err) {
    cb(err);
  });
};

module.exports.getMuted = function (cb) {
  getInfo(function (err, obj) {
    if(err) {
      cb(err);
    } else {
      cb(null, obj.muted);
    }
  });
};

module.exports.setMuted = function (val, cb) {
  amixer(['set', 'PCM', (val?'mute':'unmute')], function (err) {
    cb(err);
  });
};
