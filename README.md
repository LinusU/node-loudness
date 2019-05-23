# node-loudness

A node.js library to control the systems output volume

## Usage

The library currently has support for four simple async functions. The volume is specified as an integer between 0 and 100 (inc.).

```javascript
const loudness = require('loudness')

loudness.setVolume(45).then(() => {
	// Done
}).catch(err => console.log('oops, there was an error', err))

loudness.getVolume().then(vol => {
	// vol = 45
}).catch(err => console.log('oops, there was an error', err))

loudness.setMuted(false).then(() => {
	// Done
}).catch(err => console.log('oops, there was an error', err))

loudness.getMuted().then(mute => {
    // mute = false
}).catch(err => console.log('oops, there was an error', err))
```

## OS Support

Currently Mac OS X and Linux (ALSA) is supported, please send a pull requests if you are using another setup.
