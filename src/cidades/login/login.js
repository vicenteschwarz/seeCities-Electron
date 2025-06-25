const login = document.getElementById('user')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')
const botao = document.getElementById('botao-acesso')

botao.addEventListener('click', validarLogin)


async function validarLogin() {

    const result = await window.pi_API.loginValidation(login.value, senha.value);
    console.log(result.perfil)
    if (result.perfil === 'ADM') {
        msg.textContent = 'Validado!';
        msg.style.color = 'green';
        await window.windows_API.createMainWindow()

        localStorage.setItem('usuarioLogado', login.value)
        localStorage.setItem('perfilLogado', result.perfil)
        localStorage.getItem('usuarioLogado')
        localStorage.getItem('perfilLogado')
        };

    if (result.perfil === 'USER') {
        msg.textContent = 'Validado!';
        msg.style.color = 'green';
        await window.windows_API.createMainWindowUser()
        
        localStorage.setItem('usuarioLogado', login.value)
        localStorage.setItem('perfilLogado', result.perfil)
        localStorage.getItem('usuarioLogado')
        localStorage.getItem('perfilLogado')


    } else {
        msg.textContent = 'Não validado!';
        msg.style.color = 'red';
    }
}
