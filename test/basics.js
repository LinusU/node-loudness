/* eslint-env mocha */

const loudness = require('../')

const assert = require('assert')

describe('loudness', () => {
  let systemVolume, isMuted

  before(async () => {
    await Promise.all([
      loudness.getVolume().then(v => { systemVolume = v }),
      loudness.getMuted().then(m => { isMuted = m })
    ])
  })

  after(async () => {
    await Promise.all([
      loudness.setVolume(systemVolume),
      loudness.setMuted(isMuted)
    ])
  })

  it('should set and get the volume', async () => {
    await loudness.setVolume(15)
    const vol = await loudness.getVolume()
    assert.strictEqual(vol, 15)
  })

  it('should set and get the mute state', async () => {
    await loudness.setMuted(true)
    const mute = await loudness.getMuted()
    assert.strictEqual(mute, true)
  })
})
