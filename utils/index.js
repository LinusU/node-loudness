// fix: https://github.com/LinusU/node-loudness/issues/26
exports.fixWinAsarPath = (url) => url.replace(/\\app\.asar\\/, '\\app.asar.unpacked\\')
