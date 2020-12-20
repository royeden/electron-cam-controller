const { ipcRenderer } = require('electron')
const OSC = require('osc-js');

// TODO add client manager class
const client = new OSC({ plugin: new OSC.DatagramPlugin({ 
  open: { host: '127.0.0.1', port: 3333 },
  send: { host: '127.0.0.1', port: 3333 },
})})

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.osc = OSC;
  global.client = client;
})
