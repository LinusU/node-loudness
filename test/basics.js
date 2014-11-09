
var loudness = require('../');

var async = require('async');
var assert = require('assert');

describe('loudness', function () {

  var systemVolume, isMuted;

  before(function (done) {
    async.parallel([
      function (cb) {
        loudness.getVolume(function (err, vol) {
          if (err) { return cb(err); }

          systemVolume = vol;
          cb(null);
        });
      },
      function (cb) {
        loudness.getMuted(function (err, mute) {
          if (err) { return cb(err); }

          isMuted = mute;
          cb(null);
        });
      }
    ], done);
  });

  after(function (done) {
    async.parallel([
      loudness.setVolume.bind(loudness, systemVolume),
      loudness.setMuted.bind(loudness, isMuted)
    ], done);
  });

  it('should set and get the volume', function (done) {
    loudness.setVolume(15, function (err) {

      assert.ifError(err);

      loudness.getVolume(function (err, vol) {

        assert.ifError(err);
        assert.equal(vol, 15);

        done();
      });

    });
  });

  it('should set and get the mute state', function (done) {
    loudness.setMuted(true, function (err) {

      assert.ifError(err);

      loudness.getMuted(function (err, mute) {

        assert.ifError(err);
        assert.equal(mute, true);

        done();
      });

    });
  });

});
