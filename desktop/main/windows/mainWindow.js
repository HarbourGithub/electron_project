const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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
            nodeIntegration: true,
            preload: path.join(__dirname, '../../utils/contextBridge.js')
        },
        icon: '../../../src/assets/logo.jpg'
    })

    if (isProduction) {
        mainWindow.loadFile(__dirname + '../../../build/index.html')
    } else {
        mainWindow.loadURL('http://localhost:8000/')
        mainWindow.webContents.openDevTools()
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    ipcMain.on('mainWindow-min', () => {
        mainWindowIsExist() && mainWindow.minimize()
    })

    ipcMain.on('mainWindow-max', () => {
        if (mainWindowIsExist()) {
            mainWindow.maximize()
            mainWindow.webContents.send('mainWindowIsMax', true)
        }
    })

    ipcMain.on('mainWindow-restore', () => {
        if (mainWindowIsExist()) {
            mainWindow.unmaximize()
            mainWindow.webContents.send('mainWindowIsMax', false)
        }
    })

    ipcMain.on('mainWindow-close', () => {
        mainWindowIsExist() && mainWindow.hide()
    })
}

function mainWindowIsExist() {
    return mainWindow && !mainWindow.isDestroyed()
}

function getMainWindow() {
    return mainWindow
}

module.exports = {
    getMainWindow,
    createMainWindow,
    mainWindowIsExist
}