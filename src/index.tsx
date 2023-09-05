import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@app/app'
import '@src/svgIcons'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
    <App />
)