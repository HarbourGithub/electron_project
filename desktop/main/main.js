const { app, BrowserWindow } = require('electron')

const isProduction = process.env.NODE_ENV === 'production'
let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1160,
        height: 752,
        minHeight: 632,
        minWidth: 960,
        show: false,
        frame: false,
        title: 'Harbour',
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (isProduction) {
        mainWindow.loadFile(__dirname + '../../../build/index.html')
    } else {
        mainWindow.loadURL('http://localhost:8000/')
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.on('ready', () => {
    createMainWindow()
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
})
app.on('will-quit', function () {
    console.log('will-quit')
})
app.on('will-finish-launching', function () {
    console.log('will-finish-launching')
})