const fs = require('fs')
const settings = require('./settings.json')

let customization = settings['workbench.colorCustomizations'] || {}

let colors = {
    purple : '#7E57C2', //org1 repo
    yellow : '#E4E64B', //bow repo
    green : '#50C878', //cd repo
    grey : '#ddd',
    black : '#000',
    darkGray : '#1E1E1E'
}
let primaryColor = colors.yellow
let activitybarBGColor = colors.darkGray
let textColor = colors.black
customization['activityBarBadge.foreground'] = primaryColor

customization["activityBarBadge.foreground"] = textColor,
customization["activityBarBadge.background"] = primaryColor,
customization["activityBar.foreground"] = textColor,
customization["activityBar.background"] = activitybarBGColor,
customization["activityBar.activeBackground"] = primaryColor,
customization["titleBar.activeBackground"] = primaryColor,
customization["titleBar.activeForeground"] = textColor,
customization["statusBar.background"] = primaryColor,
customization["statusBar.foreground"] = textColor,
customization["statusBar.border"] = primaryColor,
customization["statusBarItem.remoteBackground"] = primaryColor,
customization["statusBarItem.remoteForeground"] = textColor

fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2))