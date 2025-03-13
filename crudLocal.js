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

        function carregarLocais() {
            fetchData('model/cruds.php', { action: 'list_locais' })
                .then(data => {
                    const tbody = document.querySelector('#tabela-locais tbody');
                    tbody.innerHTML = ''; 

                    data.forEach(local => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${local.id}</td>
                            <td>${local.nome}</td>
                            <td>${local.descricao}</td>
                            <td>${local.cidade}</td>
                            <td>${local.rua}</td>
                            <td>${local.numero}</td>
                            <td>${local.complemento}</td>
                            <td>${local.imagem}</td>
                            <td>${local.categoria_id}</td>
                            <td>
                                <button class="editar-local" data-id="${local.id}" data-nome="${local.nome}" data-descricao="${local.descricao}" data-cidade="${local.cidade}" data-rua="${local.rua}" data-numero="${local.numero}" data-complemento="${local.complemento}" data-imagem="${local.imagem}" data-categoria="${local.categoria_id}">Editar</button>
                                <button class="excluir-local" data-id="${local.id}">Excluir</button>
                            </td>
                        `;
                        tbody.appendChild(tr);
                    });
                })
                .catch(error => console.error('Erro:', error));
        }

        function adicionarLocal(local) {
            fetchData('model/cruds.php', {
                action: 'add_local',
                nome: local.nome,
                descricao: local.descricao,
                cidade: local.cidade,
                rua: local.rua,
                numero: local.numero,
                complemento: local.complemento,
                imagem: local.imagem,
                categoria_id: local.categoria_id
            })
            .then(data => {
                if (data.status === 'success') {
                    carregarLocais();
                } else {
                    console.error('Erro ao adicionar local.');
                }
            })
            .catch(error => console.error('Erro:', error));
        }

        function editarLocal(local) {
            fetchData('model/cruds.php', {
                action: 'edit_local',
                id: local.id,
                nome: local.nome,
                descricao: local.descricao,
                cidade: local.cidade,
                rua: local.rua,
                numero: local.numero,
                complemento: local.complemento,
                imagem: local.imagem,
                categoria_id: local.categoria_id
            })
            .then(data => {
                if (data.status === 'success') {
                    carregarLocais();
                } else {
                    console.error('Erro ao editar local.');
                }
            })
            .catch(error => console.error('Erro:', error));
        }

        function excluirLocal(id) {
            fetchData('model/cruds.php', {
                action: 'delete_local',
                id: id
            })
            .then(data => {
                if (data.status === 'success') {
                    carregarLocais();
                } else {
                    console.error('Erro ao excluir local.');
                }
            })
            .catch(error => console.error('Erro:', error));
        }
        carregarLocais();

        document.getElementById('adicionar-local').addEventListener('click', () => {
            const nome = prompt('Nome do local:');
            const descricao = prompt('Descrição:');
            const cidade = prompt('Cidade:');
            const rua = prompt('Rua:');
            const numero = prompt('Número:');
            const complemento = prompt('Complemento:');
            const imagem = prompt('Imagem:');
            const categoria_id = prompt('Categoria_id:');
            
            if (nome && descricao && cidade && rua && numero && complemento && imagem && categoria_id) {
                const local = { nome, descricao, cidade, rua, numero, complemento, imagem, categoria_id };
                adicionarLocal(local);
            }
        });

        document.querySelector('#tabela-locais tbody').addEventListener('click', (event) => {
            if (event.target.classList.contains('editar-local')) {
                const id = event.target.dataset.id;
                const nome = event.target.dataset.nome;
                const descricao = event.target.dataset.descricao;
                const cidade = event.target.dataset.cidade;
                const rua = event.target.dataset.rua;
                const numero = event.target.dataset.numero;
                const complemento = event.target.dataset.complemento;
                const imagem = event.target.dataset.imagem;
                const categoria_id = event.target.dataset.categoria_id;

                const novoNome = prompt('Nome do local:', nome);
                const novaDescricao = prompt('Descrição:', descricao);
                const novaCidade = prompt('Cidade:', cidade);
                const novaRua = prompt('Rua:', rua);
                const novoNumero = prompt('Número:', numero);
                const novoComplemento = prompt('Complemento:', complemento);
                const novaImagem = prompt('Imagem:', imagem);
                const novaCategoria = prompt('Categoria_id:', categoria_id);

                if (novoNome && novaDescricao && novaCidade && novaRua && novoNumero && novoComplemento && novaImagem && novaCategoria) {
                    const local = { id, nome: novoNome, descricao: novaDescricao, cidade: novaCidade, rua: novaRua, numero: novoNumero, complemento: novoComplemento, imagem: novaImagem, categoria_id: novaCategoria };
                    editarLocal(local);
                }
            }

            if (event.target.classList.contains('excluir-local')) {
                const id = event.target.dataset.id;
                if (confirm('Tem certeza de que deseja excluir este local?')) {
                    excluirLocal(id);
                }
            }
        });
    });
