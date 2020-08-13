# node-loudness

A node.js library to control the systems output volume

## Usage

The library currently has support for four simple async functions. The volume is specified as an integer between 0 and 100 (inc.).

```javascript
const loudness = require('loudness')

await loudness.setVolume(45)

const vol = await loudness.getVolume()
// vol = 45

await loudness.setMuted(false)

const mute = await loudness.getMuted()
// mute = false
```

## OS Support

Currently macOS, Windows (>= Vista) and Linux (ALSA) is supported, please send a pull request if you are using another setup.
