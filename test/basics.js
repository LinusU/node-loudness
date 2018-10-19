const loudness = require('../');
const assert = require('assert');

describe('loudness', () => {

  it('should set and get the volume', async () => {
    try {
      await loudness.setVolume(15);
      const vol = await loudness.getVolume();
      return assert.equal(vol, 15);
    } catch (e) {
      console.log(e);
      return assert.ifError(e);
    }
  });

  it('should set and get the mute state', async () => {
    try {
      await loudness.setMuted(true);
      const mute = await loudness.getMuted();
      return assert.equal(mute, true);
    } catch(e) {
      return assert.ifError(err);
    }
  });

});
