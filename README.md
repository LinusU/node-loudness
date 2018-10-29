# node-loudness

A node.js library to control the systems output volume

## Usage

The library currently has support for four simple async functions. The volume is specified as an integer between 0 and 100 (inc.).

```javascript
const loudness = require('loudness')

loudness.setVolume(45, (err) => {
    // Done
})

loudness.getVolume((err, vol) => {
    // vol = 45
})

loudness.setMuted(false, (err) => {
    // Done
})

loudness.getMuted((err, mute) => {
    // mute = false
})
```

## OS Support

Currently Mac OS X and Linux (ALSA) is supported, please send a pull requests if you are using another setup.
