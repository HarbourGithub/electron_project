import React, { memo, useState } from 'react'
import { Tooltip } from 'antd'

type SvgIconProps = {
    // 图标名称
    svgName: string,
    // 图标尺寸，不传时为图标默认24px
    iconSize?: number,
    /**
    * 若该图标需要hover时改变颜色，请先把该图标内置fill属性删除，然后传入两个值，
    * iconColor：原始颜色，hoverColor：hover时的颜色
    */
    hasHover?: boolean,
    // 图标默认颜色
    iconColor?: string,
    // 图标hover时的颜色
    hoverColor?: string,
    // 图标外层盒子的类名
    className?: string,
    // 是否需要显示小手
    needPointer?: boolean,
    // 图标提示文案
    toolTipValue?: string
}

function SvgIcon(props: SvgIconProps) {
    const {
        svgName,
        iconSize,
        hasHover,
        iconColor,
        hoverColor,
        className,
        needPointer,
        toolTipValue
    } = props

    const [svgColor, setSvgColor] = useState(iconColor)

    const handleMouseEnter = () => {
        if (hasHover) {
            setSvgColor(hoverColor)
        }
    }

    const handleMouseLeave = () => {
        if (hasHover) {
            setSvgColor(iconColor)
        }
    }

    return (
        <Tooltip title={toolTipValue} arrow={false}>
            <div
                id="svg-icon"
                style={{
                    width: iconSize,
                    height: iconSize,
                    cursor: needPointer ? 'pointer' : 'normal'
                }}
                className={className}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <svg fill={svgColor} style={{ width: '100%', height: '100%' }}>
                    <use xlinkHref={`#svg-${svgName}`} />
                </svg>
            </div>
        </Tooltip>
    )
}

SvgIcon.defaultProps = {
    iconSize: 24,
    hasHover: false,
    iconColor: '#000000',
    hoverColor: '#000000',
    className: '',
    needPointer: false,
    toolTipValue: ''
}

export default memo(SvgIcon)