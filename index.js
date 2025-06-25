document.addEventListener('DOMContentLoaded', ()=>{
    
    const user = localStorage.getItem('usuarioLogado')
    const perfil = localStorage.getItem('perfilLogado')
    
    console.log(user)
    console.log(perfil)
    
    document.getElementById('nome-usuario').textContent = ` Login: ${user}`
    document.getElementById('perfil-usuario').textContent = ` Perfil: ${perfil}`
    
})