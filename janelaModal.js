
const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

function createWindow_modal(telaPai, arqHtml) {
    const janela = new BrowserWindow({
        width: 1750,
        height: 920,
        modal: true,
        parent: telaPai,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arqHtml);
    return janela;
}

function abrirModalCidades(event){
    const mainwindow = getJanelaPrincipal();
    if(mainwindow){
        createWindow_modal(mainwindow, './src/cidades/cidades.html');
    }
}

function abrirModalDevs(event){
    const mainwindow = getJanelaPrincipal();
    if(mainwindow){
        createWindow_modal(mainwindow, './src/cidades/devs/devs.html');
    }
}

function abrirModalUsers(event){
    const mainwindow = getJanelaPrincipal();
    if(mainwindow){
        createWindow_modal(mainwindow, './src/cidades/users/users.html');
    }
}

module.exports = {
    createWindow_modal,
    abrirModalCidades,
    abrirModalDevs,
    abrirModalUsers
}
