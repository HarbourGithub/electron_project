declare global {
    interface Window {
        ipcRenderer: {
            send: (...args: any[]) => void,
            on: (channel: string, listener: (...args: any[]) => void) => void,
            once: (channel: string, listener: (...args: any[]) => void) => void,
            removeListener: (channel: string, listener: (...args: any[]) => void) => void,
            sendSync: (...args: any[]) => any,
            invoke: (...args: any[]) => Promise<any>,
        },
        process: {
            NODE_ENV: 'development' | 'production'
        }
    }
}

type ArgsType = string | number | boolean | { [key: string]: any } | any[]

export const isDesktop = () => {
    return !!window.ipcRenderer
}

export const getProcessNodeEnv = () => {
    return window?.process?.NODE_ENV
}

export const ipcRendererSend = (eventName: string, ...args: ArgsType[]) => {
    window.ipcRenderer?.send(eventName, ...args)
}

export const ipcRendererSendSync = (eventName: string, ...args: ArgsType[]) => {
    return window.ipcRenderer?.sendSync(eventName, ...args)
}

export const ipcRendererInvoke = (eventName: string, ...args: ArgsType[]) => {
    try {
        return window.ipcRenderer?.invoke(eventName, ...args)
    } catch (error) {
        console.error(`Error invoking IPC: ${eventName}`, error)
        return null
    }
}

export const ipcRendererOn = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.on(eventName, listener)
}

export const ipcRendererOnce = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.once(eventName, listener)
}

export const ipcRendererRemoveListener = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.removeListener(eventName, listener)
}