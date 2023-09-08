import React, { memo, useState, useEffect } from 'react'
import './desktopHeader.less'
import SvgIcon from '@components/svgIcon'
import {
    ipcRendererSend,
    ipcRendererOn,
    ipcRendererRemoveListener
} from '@common/desktopUtils'
import logoImage from '@assets/logo.jpg'

function DesktopHeader() {

    const [windowIsMax, setWindowIsMax] = useState(false)

    useEffect(() => {
        const handleSetIsMax = (event: any, isMax: boolean) => {
            setWindowIsMax(isMax)
        }
        ipcRendererOn('mainWindowIsMax', handleSetIsMax)
        return () => {
            ipcRendererRemoveListener('mainWindowIsMax', handleSetIsMax)
        }
    }, [])

    const handleWindow = (eventName: string) => {
        ipcRendererSend(`mainWindow-${eventName}`)
    }

    return (
        <div className="desktop-header">
            <div className="header-logo-box">
                <img src={logoImage} alt="" />
                <span>Harbour</span>
            </div>
            <div className="header-handle-box">
                <div className="handle-icon-box" onClick={handleWindow.bind(this, 'min')}>
                    <SvgIcon
                        svgName="min-icon"
                        needPointer
                        iconColor="#737780"
                        iconSize={24}
                    />
                </div>
                {windowIsMax ? (
                    <div className="handle-icon-box" onClick={handleWindow.bind(this, 'restore')}>
                        <SvgIcon
                            svgName="restore-icon"
                            needPointer
                            iconColor="#737780"
                            iconSize={24}
                        />
                    </div>
                ) : (
                    <div className="handle-icon-box" onClick={handleWindow.bind(this, 'max')}>
                        <SvgIcon
                            svgName="max-icon"
                            needPointer
                            iconColor="#737780"
                            iconSize={24}
                        />
                    </div>
                )}
                <div className="handle-icon-box handle-close-icon" onClick={handleWindow.bind(this, 'close')}>
                    <SvgIcon
                        svgName="close-icon"
                        needPointer
                        hasHover
                        iconColor="#737780"
                        hoverColor="#fff"
                        iconSize={24}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(DesktopHeader)