
const tabelaDevs = document.getElementById('devsTableDados');
const idDev = document.getElementById('dev-id')
const nome = document.getElementById('dev-nome');
const login = document.getElementById('dev-login');
const senha = document.getElementById('dev-password');
const email = document.getElementById('dev-email');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoLimpar = document.getElementById('btn-incluir');
const campoBusca = document.getElementById('busca-dev');

botaoSalvar.addEventListener('click', insereOuAttDev)
botaoExcluir.addEventListener('click', excluirDev)
botaoLimpar.addEventListener('click', limpar)
campoBusca.addEventListener('input', filtrarDevs)

function limpar() {
    mostrarDetalhes('', '', '', '', '')
}

function mostrarDetalhes(name, loginTxt, password, emailTxt, id) {
    nome.value = name;
    login.value = loginTxt;
    senha.value = password;
    email.value = emailTxt;
    idDev.value = id;
}

async function insereOuAttDev() {
    const pNome = nome.value
    const pLogin = login.value
    const pSenha = senha.value
    const pEmail = email.value
    const pId = idDev.value
    
        if (pSenha.length !== 4){
        alert('A senha deve ter 4 algarismos')
        return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pEmail)) {
        alert('Email inválido');
        return
        }
        
        if (pId === '') {
        await window.pi_API.inserirDevs(pNome, pLogin, pSenha, pEmail)
        alert('Dev cadastrado com sucesso!');
        } else {
        await window.pi_API.atualizarDevs(pNome, pLogin, pSenha, pEmail, pId)
        alert('Dev atualizado com sucesso!');
        }
        carregarDevs()
    mostrarDetalhes('', '', '', '', '')
    }

    


async function excluirDev() {
    const pId = idDev.value
    await window.pi_API.deletarDevs(pId)
    alert('Dev excluído com sucesso!');
    carregarDevs()
    mostrarDetalhes('', '', '', '', '')
}

let listaDevsGlobal = []

async function carregarDevs() {
    const lista = await window.pi_API.buscarDevs()
    listaDevsGlobal = lista;
    renderizarDevs(lista)
}

function renderizarDevs(lista) {
    tabelaDevs.innerHTML = ""
    lista.forEach(criarLinhaDev)
    if (!lista.length > 0) {
        tabelaDevs.textContent = 'sem dados'
    }
    lucide.createIcons();
}

function criarLinhaDev(dev) {
    const linha = document.createElement('tr')

    linha.innerHTML = `
        <td>${dev.name_devs}</td>
        <td>${dev.login_devs}</td>
        <td>${dev.password_devs || ''}</td>
        <td>${dev.email_devs || ''}</td>
    `;

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.classList.add("botao-editar");
    botao.innerHTML = '<i data-lucide="edit"></i> Editar';
    botao.addEventListener("click", function () {
        mostrarDetalhes(dev.name_devs, dev.login_devs, dev.password_devs, dev.email_devs, dev.id_devs)
    });
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaDevs.appendChild(linha);
}

function filtrarDevs() {
    const termo = campoBusca.value.toLowerCase();
    const filtrados = listaDevsGlobal.filter(d => d.name_devs.toLowerCase().includes(termo));
    renderizarDevs(filtrados);
}

carregarDevs();
