const { ipcRenderer } = require('electron')
const i18n = require('./i18n/client')


// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.i18n = i18n;
})
