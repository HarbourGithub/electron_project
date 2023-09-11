const { app, Tray, Menu } = require('electron')
const path = require('path')
const { getMainWindow, mainWindowIsExist } = require('./windows/mainWindow')

let tray = null
const iconPath = path.resolve(__dirname, './assets/logo.png')

function initTray() {
    tray = new Tray(iconPath)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '打开应用', click: () => {
                mainWindowIsExist() && getMainWindow().show()
            }
        },
        { label: '退出应用', click: () => { app.quit() } },
    ])
    
    tray.setToolTip('Harbour') // 设置鼠标悬停时显示的提示信息
    tray.setContextMenu(contextMenu)
    
    tray.on('click', () => {
        mainWindowIsExist() && getMainWindow().show()
    })
}

function getTray() {
    return tray
}

module.exports = { initTray, getTray }


