import React from 'react'
import DesktopHeader from '@components/desktopHeader'
import './app.less'
import { isDesktop } from '@common/desktopUtils'

function App() {
    return (
        <div id="electron-app">
            {isDesktop() && <DesktopHeader />}
            <div className={isDesktop() ? 'desktop-app-content' : 'app-content'}> </div>
        </div>
    )
}

export default App