
const { ipcRenderer, contextBridge } = require("electron");

// CIDADES
function buscarCidades() {
    return ipcRenderer.invoke('buscar-cidades');
}
function deletarCidades(id) {
    return ipcRenderer.invoke('deletar-cidades', id);
}
function atualizarCidades(pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId) {
    return ipcRenderer.invoke('att-cidade', pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId);
}
function inserirCidades(city, state, country, climate, culture, tourist_att) {
    return ipcRenderer.invoke('inserir-cidades', city, state, country, climate, culture, tourist_att);
}

// DEVS
function buscarDevs() {
    return ipcRenderer.invoke('buscar-devs');
}
function deletarDevs(id) {
    return ipcRenderer.invoke('deletar-devs', id);
}
function atualizarDevs(name, login, password, email, id) {
    return ipcRenderer.invoke('att-dev', name, login, password, email, id);
}
function inserirDevs(name, login, password, email) {
    return ipcRenderer.invoke('inserir-devs', name, login, password, email);
}

// USERS
function buscarUsers() {
    return ipcRenderer.invoke('buscar-users');
}
function deletarUsers(id) {
    return ipcRenderer.invoke('deletar-users', id);
}
function atualizarUsers(name, login, password, email, id) {
    return ipcRenderer.invoke('att-user', name, login, password, email,id);
}
function inserirUsers(name, login, password, email) {
    return ipcRenderer.invoke('inserir-users', name, login, password, email);
}
//login

function loginValidation(usuario, senha){
    return ipcRenderer.invoke('validar-login',usuario, senha)
}

// EXPORTAÇÃO SEGURA
contextBridge.exposeInMainWorld('pi_API', {
    buscarCidades,
    deletarCidades,
    atualizarCidades,
    inserirCidades,

    buscarDevs,
    deletarDevs,
    atualizarDevs,
    inserirDevs,
    
    buscarUsers,
    deletarUsers,
    atualizarUsers,
    inserirUsers,

    loginValidation
});

function windowCidades() {
    ipcRenderer.send('window-cidades');
}
function windowDevs() {
    ipcRenderer.send('window-devs');
}
function windowUsers() {
    ipcRenderer.send('window-users');
}
function createMainWindow(){
    ipcRenderer.send('window')
}
function createMainWindowUser(){
    ipcRenderer.send('windowUserMain')
}


contextBridge.exposeInMainWorld('windows_API', {
    windowCidades,
    windowDevs,
    windowUsers,
    createMainWindow,
    createMainWindowUser
});
