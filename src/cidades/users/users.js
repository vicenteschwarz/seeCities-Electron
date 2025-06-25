
const tabelaUsers = document.getElementById('usersTableDados');
const idUser = document.getElementById('user-id')
const nome = document.getElementById('user-nome');
const login = document.getElementById('user-login');
const senha = document.getElementById('user-password');
const email = document.getElementById('user-email');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoLimpar = document.getElementById('btn-incluir');
const campoBusca = document.getElementById('busca-user');

botaoSalvar.addEventListener('click', insereOuAttUser)
botaoExcluir.addEventListener('click', excluirUser)
botaoLimpar.addEventListener('click', limpar)
campoBusca.addEventListener('input', filtrarUsers)

function limpar() {
    mostrarDetalhes('', '', '', '', '', '')
}

function mostrarDetalhes(name, loginTxt, password, emailTxt, id) {
    nome.value = name;
    login.value = loginTxt;
    senha.value = password;
    email.value = emailTxt;
    idUser.value = id;
}

async function insereOuAttUser() {
    const pNome = nome.value
    const pLogin = login.value
    const pSenha = senha.value
    const pEmail = email.value
    const pId = idUser.value
    
    if (pSenha.length !== 4){
        alert('A senha deve ter 4 algarismos')
        return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pEmail)) {
        alert('Email inválido');
        return
        }
        
    if (pId === '') {
        await window.pi_API.inserirUsers(pNome, pLogin, pSenha, pEmail)
        alert('User cadastrado com sucesso!');
    } else {
        await window.pi_API.atualizarUsers(pNome, pLogin, pSenha, pEmail, pId)
        alert('User atualizado com sucesso!');
    }

    carregarUsers()
    mostrarDetalhes('', '', '', '', '', '')
}

async function excluirUser() {
    const pId = idUser.value
    await window.pi_API.deletarUsers(pId)
    alert('User excluído com sucesso!');
    carregarUsers()
    mostrarDetalhes('', '', '', '', '', '')
}

let listaUsersGlobal = []

async function carregarUsers() {
    const lista = await window.pi_API.buscarUsers()
    listaUsersGlobal = lista;
    renderizarUsers(lista)
}

function renderizarUsers(lista) {
    tabelaUsers.innerHTML = ""
    lista.forEach(criarLinhaUser)
    if (!lista.length > 0) {
        tabelaUsers.textContent = 'sem dados'
    }
    lucide.createIcons();
}

function criarLinhaUser(user) {
    const linha = document.createElement('tr')

    linha.innerHTML = `
        <td>${user.name_users}</td>
        <td>${user.login_users}</td>
        <td>${user.password_users || ''}</td>
        <td>${user.email_users || ''}</td>
    `;

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.classList.add("botao-editar");
    botao.innerHTML = '<i data-lucide="edit"></i> Editar';
    botao.addEventListener("click", function () {
        mostrarDetalhes(user.name_users, user.login_users, user.password_users, user.email_users, user.id_users)
    });
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaUsers.appendChild(linha);
}

function filtrarUsers() {
    const termo = campoBusca.value.toLowerCase();
    const filtrados = listaUsersGlobal.filter(u => u.name_users.toLowerCase().includes(termo));
    renderizarUsers(filtrados);
}

carregarUsers();
