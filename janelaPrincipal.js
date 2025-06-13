const { BrowserWindow } = require('electron')
const path = require('path')

let janelaPrincipal

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaPrincipal.loadFile('index.html');

    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null //limpar
    })

    return janelaPrincipal
}

function getJanelaPrincipal(){
    return janelaPrincipal
}

module.exports={
    getJanelaPrincipal,
    createMainWindow
}