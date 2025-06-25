const { BrowserWindow } = require('electron')
const path = require('path')

let janelaPrincipal
let janelaLogin

//main

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

    
    janelaLogin.close()

    return janelaPrincipal
}

function createMainWindowUser() {
    janelaPrincipal = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    janelaPrincipal.loadFile('index-login.html');

    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null //limpar
    })

    
    janelaLogin.close()

    return janelaPrincipal
}

function getJanelaPrincipal(){
    return janelaPrincipal
}

//login

function createLoginWindow(){
    janelaLogin = new BrowserWindow({
        width:650,
        height:550,
        webPreferences:{
            preload:path.join(__dirname, 'preload.js')
        }
    })

    janelaLogin.loadFile('./src/cidades/login/login.html')

    janelaLogin.on('closed', ()=> {
        janelaLogin = null
    })

    return janelaLogin
}

function getJanelaLogin(){
    return janelaLogin
}

//---

module.exports={
    getJanelaPrincipal,
    createMainWindow,
    createLoginWindow,
    getJanelaLogin,
    createMainWindowUser

}