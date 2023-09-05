const { contextBridge, ipcRenderer } = require('electron')

/**
 * contextBridge.exposeInMainWorld的作用就是将主进程的某些API注入到渲染进程，
 * 供渲染进程使用（主进程并非所有的API或对象都能注入给渲染进程，需要参考文档）
 * ipcRenderer 渲染进程通过window.ipcRenderer调用
 */
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, ...args) => {
        if (args?.length > 0) {
            ipcRenderer.send(channel, ...args)
        } else {
            ipcRenderer.send(channel)
        }
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, func)
    },
    once: (channel, func) => {
        ipcRenderer.once(channel, func)
    },
    removeListener: (channel, func) => {
        ipcRenderer.removeListener(channel, func)
    },
    sendSync: (channel, ...args) => {
        if (args?.length > 0) {
            return ipcRenderer.sendSync(channel, ...args)
        } else {
            return ipcRenderer.sendSync(channel)
        }
    },
    invoke: (channel, ...args) => {
        try {
            return ipcRenderer.invoke(channel, ...args)
        } catch (error) {
            console.error(`Error invoking API: ${channel}`, error)
        }
    },
})