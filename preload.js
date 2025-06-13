const { ipcRenderer, contextBridge } = require("electron");

// FUNÇÕES
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

// EXPORTA PARA A JANELA
contextBridge.exposeInMainWorld('pi_API', {
    buscarCidades,
    deletarCidades,
    atualizarCidades,
    inserirCidades
});

// ABRIR JANELAS
function windowCidades() {
    ipcRenderer.send('window-cidades');
}

contextBridge.exposeInMainWorld('windows_API', {
    windowCidades
});
