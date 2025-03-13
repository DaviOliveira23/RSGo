document.addEventListener('DOMContentLoaded', function() {
    function fetchData(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json());
    }

    function carregarUsuarios() {
        fetchData('model/cruds.php', { action: 'list' })
            .then(data => {
                const tbody = document.querySelector('#tabela-usuarios tbody');
                tbody.innerHTML = '';
                data.forEach(usuario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.senha}</td>
                        <td>${usuario.tipo}</td>
                        <td>
                        <button class="editar-usuario" data-id="${usuario.id}" data-nome="${usuario.nome}" data-email="${usuario.email}" data-senha="${usuario.senha}" data-tipo="${usuario.tipo}">Editar</button>
                        <button class="excluir-usuario" data-id="${usuario.id}">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Erro:', error));
    }

    function adicionarUsuario(usuario) {
        fetchData('model/cruds.php', {
            action: 'add',
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipo: usuario.tipo
        })
        .then(data => {
            if (data.status === 'success') {
                carregarUsuarios();
            } else {
                console.error('Erro ao adicionar usuário.');
            }
        })
        .catch(error => console.error('Erro:', error));
    }

    function editarUsuario(usuario) {
        fetchData('model/cruds.php', {
            action: 'edit',
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipo: usuario.tipo
        })
        .then(data => {
            if (data.status === 'success') {
                carregarUsuarios();
            } else {
                console.error('Erro ao editar usuário.');
            }
        })
        .catch(error => console.error('Erro:', error));
    }

    function excluirUsuario(id) {
        fetchData('model/cruds.php', {
            action: 'delete',
            id: id
        })
        .then(data => {
            if (data.status === 'success') {
                carregarUsuarios();
            } else {
                console.error('Erro ao excluir usuário.');
            }
        })
        .catch(error => console.error('Erro:', error));
    }
    carregarUsuarios();

    document.getElementById('adicionar-usuario').addEventListener('click', () => {
        const nome = prompt('Nome:');
        const email = prompt('Email:');
        const senha = prompt('Senha:');
        const tipo = prompt('Tipo (admin/comum):');
        
        if (nome && email && senha && tipo) {
            const usuario = { nome, email, senha, tipo };
            adicionarUsuario(usuario);
        }
    });

    document.querySelector('#tabela-usuarios tbody').addEventListener('click', (event) => {
        if (event.target.classList.contains('editar-usuario')) {
            const id = event.target.dataset.id;
            const nome = prompt('Nome:');
            const email = prompt('Email:');
            const senha = prompt('Senha:');
            const tipo = prompt('Tipo (admin/comum):');
            
            if (nome && email && tipo) {
                const usuario = { id, nome, email, senha, tipo };
                editarUsuario(usuario);
            }
        }

        if (event.target.classList.contains('excluir-usuario')) {
            const id = event.target.dataset.id;
            if (confirm('Tem certeza de que deseja excluir este usuário?')) {
                excluirUsuario(id);
            }
        }
    });
});
