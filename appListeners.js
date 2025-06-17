
const { ipcMain } = require("electron");

const {
    buscarCidades,
    deletarCidades,
    atualizarCidades,
    inserirCidades
} = require('./src/cidades/cidades_db');

const {
    buscarDevs,
    deletarDevs,
    atualizarDevs,
    inserirDevs
} = require('./src/cidades/devs/devs_db');

const {
    buscarUsers,
    deletarUsers,
    atualizarUsers,
    inserirUsers
} = require('./src/cidades/users/users_db');

const {
    abrirModalCidades,
    abrirModalDevs,
    abrirModalUsers
} = require("./janelaModal");

function registrarCidadesHandler(){
    ipcMain.handle('buscar-cidades', buscarCidades)
    ipcMain.handle('deletar-cidades', deletarCidades)
    ipcMain.handle('att-cidade', atualizarCidades)
    ipcMain.handle('inserir-cidades', inserirCidades)
}

function registrarDevsHandler(){
    ipcMain.handle('buscar-devs', buscarDevs)
    ipcMain.handle('deletar-devs', deletarDevs)
    ipcMain.handle('att-dev', atualizarDevs)
    ipcMain.handle('inserir-devs', inserirDevs)
}

function registrarUsersHandler(){
    ipcMain.handle('buscar-users', buscarUsers)
    ipcMain.handle('deletar-users', deletarUsers)
    ipcMain.handle('att-user', atualizarUsers)
    ipcMain.handle('inserir-users', inserirUsers)
}

function registrarJanelas(){
    ipcMain.on('window-cidades', abrirModalCidades)
    ipcMain.on('window-devs', abrirModalDevs)
    ipcMain.on('window-users', abrirModalUsers)
}

function registrarListeners(){
    registrarCidadesHandler()
    registrarDevsHandler()
    registrarUsersHandler()
    registrarJanelas()
}

module.exports = {
    registrarJanelas,
    registrarListeners
}
