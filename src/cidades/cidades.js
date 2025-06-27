const tabelaCidades = document.getElementById('cidadesTableDados');
const idCidade = document.getElementById('city-id')
const cidade = document.getElementById('city-nome');
const estado = document.getElementById('state-nome');
const pais = document.getElementById('country-nome');
const clima = document.getElementById('climate-nome');
const cultura = document.getElementById('culture-nome');
const atracao_t = document.getElementById('tourist-att');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoLimpar = document.getElementById('btn-incluir');
const campoBusca = document.getElementById('busca-cidade');

botaoSalvar.addEventListener('click', insereOuAttCidade)
botaoExcluir.addEventListener('click', excluirCidade)
botaoLimpar.addEventListener('click', limpar)
campoBusca.addEventListener('input', filtrarCidades)

function aplicarRestricoesParaUser() {
    const perfil = localStorage.getItem('perfilLogado');
    if (perfil === 'USER') {
        
        cidade.disabled = true;
        estado.disabled = true;
        pais.disabled = true;
        cultura.disabled = true;
        
        botaoExcluir.style.display = 'none'
        botaoLimpar.style.display = 'none';

        botaoSalvar.removeEventListener('click', insereOuAttCidade);
        botaoSalvar.addEventListener('click', atualizarClimaAtracaoApenas);
    }
}

async function atualizarClimaAtracaoApenas() {
    const pId = idCidade.value;
    const pClima = clima.value;
    const pAtracao = atracao_t.value;

    if (!pId) {
        alert('Selecione uma cidade para editar.');
        return;
    }
    
    const cidadeOriginal = listaCidadesGlobal.find(c => c.id == pId);
    if (!cidadeOriginal) {
        alert('Cidade não encontrada.');
        return;
    }

    await window.pi_API.atualizarCidades(
        cidadeOriginal.city,
        cidadeOriginal.state,
        cidadeOriginal.country,
        pClima,
        cidadeOriginal.culture,
        pAtracao,
        pId
    );

    alert('Clima e Atrações atualizados com sucesso!');
    carregarCidades();
    mostrarDetalhes('', '', '', '', '', '', '');
}


function limpar() {
    mostrarDetalhes('', '', '', '', '', '', '')
}

function mostrarDetalhes(city, state, country, climate, culture, tourist_att, id) {
    cidade.value = city;
    estado.value = state;
    pais.value = country;
    clima.value = climate;
    cultura.value = culture;
    atracao_t.value = tourist_att;
    idCidade.value = id;
}

async function insereOuAttCidade() {
    const pCidade = cidade.value
    const pEstado = estado.value
    const pPais = pais.value
    const pClima = clima.value
    const pCultura = cultura.value
    const pAtracao_t = atracao_t.value
    const pId = idCidade.value

    if (pId === '') {
        await window.pi_API.inserirCidades(pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t)
        alert('Cidade cadastrada com sucesso!');
    } else {
        await window.pi_API.atualizarCidades(pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId)
        alert('Cidade atualizada com sucesso!');
    }

    carregarCidades()
    mostrarDetalhes('', '', '', '', '', '', '')
}

async function excluirCidade() {
    const pId = idCidade.value
    await window.pi_API.deletarCidades(pId)
    alert('Cidade deletada com sucesso!');
    carregarCidades()
    mostrarDetalhes('', '', '', '', '', '', '')
}

let listaCidadesGlobal = []

async function carregarCidades() {
    const listaCidades = await window.pi_API.buscarCidades()
    listaCidadesGlobal = listaCidades;
    renderizarCidades(listaCidades)
}

function renderizarCidades(lista) {

    console.time("carregarCidades");

    tabelaCidades.innerHTML = ""
    lista.forEach(criarLinhaCidade)
    if (!lista.length > 0) {
        tabelaCidades.textContent = 'sem dados'
    }
    lucide.createIcons();

    console.timeEnd("carregarCidades");

}

function criarLinhaCidade(cidade) {
    const linha = document.createElement('tr')

    const celulaCidade = document.createElement('td')
    celulaCidade.textContent = cidade.city
    linha.appendChild(celulaCidade)

    const celulaEstado = document.createElement('td')
    celulaEstado.textContent = cidade.state
    linha.appendChild(celulaEstado)

    const celulaPais = document.createElement('td')
    celulaPais.textContent = cidade.country
    linha.appendChild(celulaPais)

    const celulaClima = document.createElement('td')
    celulaClima.textContent = cidade.climate
    linha.appendChild(celulaClima)

    const celulaCultura = document.createElement('td')
    celulaCultura.textContent = cidade.culture
    linha.appendChild(celulaCultura)

    const celulaTurists = document.createElement('td')
    celulaTurists.textContent = cidade.tourist_att
    linha.appendChild(celulaTurists)

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.classList.add("botao-editar");
    botao.style.backgroundColor = "#2d8c49";
    botao.style.color = "white";
    botao.style.padding = "10px 16px";
    botao.style.border = "none";
    botao.style.borderRadius = "8px";
    botao.style.fontWeight = "bold";
    botao.style.cursor = "pointer";
    botao.style.display = "flex";
    botao.style.alignItems = "center";
    botao.style.gap = "6px";
    botao.innerHTML = '<i data-lucide="edit"></i> Editar';
    botao.addEventListener("click", function () {
        mostrarDetalhes(cidade.city, cidade.state, cidade.country, cidade.climate, cidade.culture, cidade.tourist_att, cidade.id)
    });
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaCidades.appendChild(linha);
}

function filtrarCidades() {
    const termo = campoBusca.value.toLowerCase();
    const filtradas = listaCidadesGlobal.filter(c => c.city.toLowerCase().includes(termo));
    renderizarCidades(filtradas);
}

carregarCidades();
aplicarRestricoesParaUser();

