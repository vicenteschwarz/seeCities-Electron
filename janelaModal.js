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
    console.log('vou abrir a tela de cidades')
    let mainwindow = getJanelaPrincipal()
    if(mainwindow){
        createWindow_modal(mainwindow, './src/cidades/cidades.html')
    } else {
        alert('Janela de cidades com problemas')
    }
}

module.exports = {
    createWindow_modal,
    abrirModalCidades
}