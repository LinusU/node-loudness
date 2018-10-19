const { exec } = require('child_process');

function osascript(cmd) {
    return new Promise((resolve, reject) => {
        exec(`osascript -e '${cmd}'`, (err, stdout, stderr) => {
            if (err) {
                const error = new Error('Apple Script Error:', err);
                reject(error);
            } else if (stderr) {
                const error = new Error('Apple Script Error:', stderr);
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

async function getVolume() {
    const vol = await osascript('output volume of (get volume settings)');
    return parseInt(vol, 10);
}

function setVolume(val) {
    return osascript(`set volume output volume ${val}`);
}

async function getMuted() {
    const mute = await osascript('output muted of (get volume settings)');
    return (mute === 'true');
}

function setMuted(val) {
    return osascript(`set volume ${(val ? 'with' : 'without')} output muted`);
}

module.exports = {
    getVolume,
    setVolume,
    getMuted,
    setMuted,
};
