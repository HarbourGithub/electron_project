import React, { useEffect, useRef, useCallback, ChangeEvent } from 'react'
import DesktopHeader from '@components/desktopHeader'
import './app.less'
import {
    isDesktop,
    getProcessNodeEnv,
    ipcRendererSend
} from '@common/desktopUtils'
import electronImg from '@assets/electronImg.png'

function App() {

    const openDevtoolInput = useRef<HTMLInputElement>(null)
    const isDevelopment = useRef(getProcessNodeEnv() === 'development')

    const openDevtool = useCallback(() => {
        ipcRendererSend('mainWindow-open-devtool')
    }, [])

    const openDevtoolInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (value === 'openDevtool') {
            openDevtool()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            const { ctrlKey, metaKey, altKey, key } = e
            // 开发环境使用ctrl + F12打开控制台
            if (isDevelopment.current && ctrlKey && key === 'F12') {
                openDevtool()
            }
            // 开发环境使用ctrl + win + alt + F12，然后键入'open devtool'打开控制台
            if (!isDevelopment.current && ctrlKey && metaKey && altKey && key === 'F12') {
                if (openDevtoolInput.current) {
                    openDevtoolInput.current.focus()
                }
            }
        })
    }, [openDevtool])

    return (
        <div id="electron-app">
            {!isDevelopment.current && (
                <input
                    className="open-devtool-input"
                    ref={openDevtoolInput}
                    type="text"
                    onChange={openDevtoolInputChange}
                    onBlur={(e) => { e.target.value = '' }}
                />
            )}
            {isDesktop() && <DesktopHeader />}
            <div className={isDesktop() ? 'desktop-app-content' : 'app-content'}>
                <div className="electron-img">
                    <img src={electronImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default App