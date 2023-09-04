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
                <div className="handle-icon-box">
                    <SvgIcon
                        svgName="min-icon"
                        needPointer
                        iconColor="#737780"
                        iconSize={24}
                    />
                </div>
                <div className="handle-icon-box">
                    <SvgIcon
                        svgName="max-icon"
                        needPointer
                        iconColor="#737780"
                        iconSize={24}
                    />
                </div>
                <div className="handle-icon-box handle-close-icon">
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