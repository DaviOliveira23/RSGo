function salvarDados() {
    const nome = document.getElementById('nome nm_cad').value; // Corrigir problema de nome da classe nome nm_cad
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
        localStorage.setItem('nomeUsuario', nome);
        localStorage.setItem('emailUsuario', email);
        localStorage.setItem('senhaUsuario', senha);
        console.log('Dados salvos automaticamente.');
    }
}

function carregarDados() {
    const nome = localStorage.getItem('nomeUsuario');
    const email = localStorage.getItem('emailUsuario');
    const senha = localStorage.getItem('senhaUsuario');

    if (nome || email || senha) {
        document.getElementById('nome nm_cad').value = nome ? nome : '';
        document.getElementById('email').value = email ? email : '';
        document.getElementById('senha').value = senha ? senha : '';
        console.log('Dados carregados automaticamente.');
    }
}

// Adiciona event listeners para salvar dados ao preencher os campos
document.getElementById('nome nm_cad').addEventListener('input', salvarDados);
document.getElementById('email').addEventListener('input', salvarDados);
document.getElementById('senha').addEventListener('input', salvarDados);

// Carrega os dados automaticamente ao carregar a página
window.onload = function() {
    carregarDados();
};

document.getElementById('formUsuario').addEventListener('submit', function(event) {
    event.preventDefault();
});
