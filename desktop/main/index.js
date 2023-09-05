const { app } = require('electron')
const { createMainWindow } = require('./windows/mainWindow')
const { initTray, getTray } = require('./systemTray')

app.on('ready', () => {
    createMainWindow()
    initTray()
})
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault()
    callback(true)
})
app.on('before-quit', () => {
    console.log('app before-quit')
})
app.on('window-all-closed', function () {
    console.log('window-all-closed')
})
app.on('activate', function () {
    console.log('activate')
})
app.on('quit', function () {
    console.log('quit')
    getTray() && getTray().destroy()
})
app.on('will-quit', function () {
    console.log('will-quit')
})
app.on('will-finish-launching', function () {
    console.log('will-finish-launching')
})