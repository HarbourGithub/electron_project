import React, { memo } from 'react'
import './desktopHeader.less'
import SvgIcon from '@components/svgIcon'
import logoImage from '../../assets/logo.jpg'

function DesktopHeader() {
    return (
        <div className="desktop-header">
            <div className="header-logo-box">
                <img src={logoImage} alt="" />
                <span>Harbour</span>
            </div>
            <div className="header-handle-box">
                <SvgIcon
                    svgName="min-icon"
                    needPointer
                    iconColor="#737780"
                    className="handle-icon"
                    iconSize={32}
                />
                <SvgIcon
                    svgName="max-icon"
                    needPointer
                    iconColor="#737780"
                    className="handle-icon"
                    iconSize={32}
                />
                <SvgIcon
                    svgName="close-icon"
                    needPointer
                    hasHover
                    iconColor="#737780"
                    hoverColor="#fff"
                    className="handle-icon handle-close-icon"
                    iconSize={32}
                />
            </div>
        </div>
    )
}

export default memo(DesktopHeader)