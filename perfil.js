document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado"); 
    console.log("Estado do usuário: ", usuarioLogado); 

    if (usuarioLogado === true || usuarioLogado === 'true') {
        console.log("Usuário está logado"); 

        const perfilContainer = document.getElementById('perfil-container');
        const perfilLink = document.createElement('a');
        perfilLink.href = 'perfilUsuario.html';
        perfilLink.className = 'perfil-link';

        const iconePerfil = document.createElement('img');
        iconePerfil.src = 'imagens/perfil-usuario.png';
        iconePerfil.alt = 'Perfil';
        iconePerfil.className = 'icone-perfil';

        perfilLink.appendChild(iconePerfil);
        perfilContainer.appendChild(perfilLink);

        perfilContainer.style.display = 'flex';
        perfilContainer.style.alignItems = 'center';
        perfilContainer.style.gap = '2em';

        // Mostrar o link de logout
        const linkLogout = document.getElementById('link-logout');
        if (linkLogout) {
            linkLogout.style.display = 'block';
            linkLogout.style.textDecoration = 'none';
            linkLogout.style.color = 'var(--cor-branco)';
        }

        // Ocultar o link de "Entrar"
        const linkEntrar = document.getElementById('link-entrar');
        if (linkEntrar) {
            linkEntrar.style.display = 'none';
        }
    } else {
        console.log("Usuário não está logado"); 
    }
});
