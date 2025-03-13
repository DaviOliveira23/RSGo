async function buscarLocais(termo = '') {
    try {
        const url = `http://localhost/RS GO PROJETO/model/locais.php?q=${encodeURIComponent(termo)}`;
        const response = await fetch(url);
        const locais = await response.json();

        console.log('Locais recebidos:', locais);
        exibirTodosLocais(locais);
    } catch (error) {
        console.error('Erro ao buscar locais:', error);
    }
}

function exibirTodosLocais(locais) {
    const listaLocais = document.getElementById('lista-locais');
    listaLocais.innerHTML = '';

    const cardsGrid = document.createElement('div');
    cardsGrid.classList.add('cards-grid');

    if (locais.length > 0) {
        locais.forEach(local => {
            console.log('Processando local:', local);
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-nome', local.nome.toLowerCase());
            card.setAttribute('data-categoria', local.categoria.toLowerCase());
            card.setAttribute('data-cidade', local.cidade.toLowerCase());
            card.innerHTML = `
                <a href="perfilLocal.html?id=${local.id}" class="card-link">
                    <img src="${local.imagem}" alt="${local.nome}" class="card-image">
                    <div class="card-content">
                        <span class="card-category">${local.categoria}</span>
                        <h3 class="card-title">${local.nome}</h3>
                        <p class="card-description">${local.descricao}</p>
                    </div>
                </a>
            `;
            cardsGrid.appendChild(card);
        });

        listaLocais.appendChild(cardsGrid);
    } else {
        listaLocais.innerHTML = '<p>Nenhum local encontrado.</p>';
    }
}

function filtrarLocais() {
    console.log('filtrarLocais chamado');
    const termo = document.querySelector('.banner__pesquisa').value.toLowerCase();
    console.log('Termo de pesquisa:', termo);

    // Verifica a categoria ativa
    const categoria = document.querySelector('.categoria-item.active') ? document.querySelector('.categoria-item.active').getAttribute('data-categoria').toLowerCase() : '';
    console.log('Categoria selecionada:', categoria);

    const locais = document.querySelectorAll('#lista-locais .card');
    locais.forEach(local => {
        const nome = local.getAttribute('data-nome');
        const categoriaLocal = local.getAttribute('data-categoria');
        const cidadeLocal = local.getAttribute('data-cidade');

        console.log(`Nome: ${nome}, Categoria: ${categoriaLocal}, Cidade: ${cidadeLocal}`);

        let match = true;

        if (termo && !nome.includes(termo) && !cidadeLocal.includes(termo)) {
            match = false;
        }
        if (categoria && categoriaLocal !== categoria) {
            match = false;
        }

        console.log(`Local: ${local.querySelector('.card-title').innerText}, Match: ${match}`);

        local.style.display = match ? 'block' : 'none';
    });
}

function filtrarPorCategoria(categoriaSelecionada) {
    console.log('Categoria selecionada para filtro:', categoriaSelecionada);
    document.querySelectorAll('.categoria-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.categoria-item[data-categoria="${categoriaSelecionada}"]`).classList.add('active');
    filtrarLocais();
}

document.querySelector('.banner__pesquisa').addEventListener('input', filtrarLocais);

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.querySelectorAll('.categoria-item').forEach(item => {
    item.addEventListener('click', event => {
        const categoria = event.target.getAttribute('data-categoria');
        filtrarPorCategoria(categoria);
    });
});



window.onload = () => buscarLocais();
