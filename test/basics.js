/* eslint-env mocha */

const loudness = require('../')

const assert = require('assert')

describe('loudness', () => {
  let systemVolume, isMuted

  before(() => {
    return Promise.all([
      loudness.getVolume().then(v => { systemVolume = v }),
      loudness.getMuted().then(m => { isMuted = m })
    ])
  })

  after(() => {
    return Promise.all([
      loudness.setVolume(systemVolume),
      loudness.setMuted(isMuted)
    ])
  })

  it('should set and get the volume', () => {
    return Promise.resolve()
      .then(() => loudness.setVolume(15))
      .then(() => loudness.getVolume())
      .then(vol => assert.strictEqual(vol, 15))
  })

  it('should set and get the mute state', () => {
    return Promise.resolve()
      .then(() => loudness.setMuted(true))
      .then(() => loudness.getMuted())
      .then(mute => assert.strictEqual(mute, true))
  })
})
