
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

var reDefaultDevice = /Simple mixer control \'([a-z0-9 -]+)\',[0-9]+/i;
var defaultDeviceCache = null;
var defaultDevice = function(cb) {
  if(defaultDeviceCache === null) {
    amixer([], function (err, data) {
      if(err) {
        cb(err);
      } else {
        var res = reDefaultDevice.exec(data);
        if(res === null) {
          cb(new Error('Alsa Mixer Error: failed to parse output'));
        } else {
          defaultDeviceCache = res[1];
          cb(null, defaultDeviceCache);
        }
      }
    });
  } else {
    cb(null, defaultDeviceCache);
  }
};

var reInfo = /[a-z][a-z ]*\: Playback [0-9-]+ \[([0-9]+)\%\] (?:[[0-9\.-]+dB\] )?\[(on|off)\]/i;
var getInfo = function (cb) {
  defaultDevice(function (err, dev) {
    if(err) {
      cb(err);
    } else {
      amixer(['get', dev], function (err, data) {
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
  defaultDevice(function (err, dev) {
    if(err) {
      cb(err);
    } else {
      amixer(['set', dev, val + '%'], function (err) {
        cb(err);
      });
    }
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
  amixer(['set', 'Master', (val?'mute':'unmute')], function (err) {
    if(err) return cb(err);

    amixer(['set', '-D', 'pulse', 'Master', (val?'mute':'unmute')], function (err) {
      // Ignore error if pulseaudio is not running 
      if(err && err.message.includes("Mixer attach pulse error: Connection refused"))
        cb();
      else
        cb(err);
    });
  });
};
