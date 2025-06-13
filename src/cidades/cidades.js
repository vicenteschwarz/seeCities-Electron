// parâmetros
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

// eventos
botaoSalvar.addEventListener('click', insereOuAttCidade)
botaoExcluir.addEventListener('click', excluirCidade)
botaoLimpar.addEventListener('click', limpar)

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
    } else {
        console.log("ID que vai para atualizar:", pId)
        await window.pi_API.atualizarCidades(pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId)
    }

    carregarCidades()
    mostrarDetalhes('', '', '', '', '', '', '')
}



async function excluirCidade() {
    const pId = idCidade.value
    await window.pi_API.deletarCidades(pId)
    carregarCidades()
    mostrarDetalhes('', '', '', '', '', '', '')
}

async function carregarCidades() {
    const listaCidades = await window.pi_API.buscarCidades()
    tabelaCidades.innerHTML = ""

    listaCidades.forEach(criarLinhaCidade)

    if (!listaCidades.length > 0) {
        tabelaCidades.textContent = 'sem dados'
    }

    lucide.createIcons(); // renderiza os ícones do Lucide
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
    botao.addEventListener("click", function () {
        mostrarDetalhes(cidade.city, cidade.state, cidade.country, cidade.climate, cidade.culture, cidade.tourist_att, cidade.id)
    });
    botao.textContent = 'Editar';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaCidades.appendChild(linha);
}

carregarCidades()
