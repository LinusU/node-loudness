
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
    // test all options - from 0% to 100%
    var indexes = Array.apply(null, {length: 101}).map(Number.call, Number);
    async.eachSeries(indexes, function (index, next) {
      loudness.setVolume(index, function (err) {
  
        assert.ifError(err);
  
        loudness.getVolume(function (err, vol) {
  
          assert.ifError(err);
          assert.equal(vol, index);
          
          next();
        });
      });
    }, function () {
      done();
    }); 
  }).timeout(5000);

  it('should mute the volume', function (done) {
    loudness.setMuted(true, function (err) {

      assert.ifError(err);

      loudness.getMuted(function (err, mute) {

        assert.ifError(err);
        assert.equal(mute, true);

        done();
      });

    });
  });

  it('should unmute the volume', function (done) {
    loudness.setMuted(false, function (err) {

      assert.ifError(err);

      loudness.getMuted(function (err, mute) {

        assert.ifError(err);
        assert.equal(mute, false);

        done();
      });

    });
  });

});
