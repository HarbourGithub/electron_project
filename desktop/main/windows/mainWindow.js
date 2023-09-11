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
            preload: path.resolve(__dirname, '../utils/contextBridge.js')
        },
        icon: path.resolve(__dirname, '../assets/logo.png')
    })

    if (isProduction) {
        const entryPath = path.resolve(__dirname, '../../../build/index.html')
        mainWindow.loadFile(entryPath)
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadURL('http://localhost:8000/')
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindowListenEvents()
}

function mainWindowListenEvents() {
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

    ipcMain.on('mainWindow-open-devtool', () => {
        mainWindowIsExist() && mainWindow.webContents.openDevTools()
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