const { ipcMain } = require("electron");

const{
    buscarCidades,
    deletarCidades,
    atualizarCidades,
    inserirCidades
} = require('./src/cidades/cidades_db');

const { 
    abrirModalCidades 
} = require("./janelaModal");

function registrarCidadesHandler(){
    ipcMain.handle('buscar-cidades', buscarCidades)
    ipcMain.handle('deletar-cidades', deletarCidades)
    ipcMain.handle('att-cidade', atualizarCidades)
    ipcMain.handle('inserir-cidades', inserirCidades)
}

function registrarJanelas(){
    ipcMain.on('window-cidades', abrirModalCidades)
}

function registrarListeners(){
    registrarCidadesHandler()
    registrarJanelas()
}

module.exports = {
    registrarJanelas,
    registrarListeners
}