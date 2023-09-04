import React from 'react'
import DesktopHeader from '@components/desktopHeader'
import './app.less'
import '@src/svgIcons'

function App() {
    return (
        <div id="electron-app">
            <DesktopHeader />
            <div className="app-content">APP</div>
        </div>
    )
}

export default App