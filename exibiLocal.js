const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
  buscarDetalhesLocal(id);
} else {
  console.error('ID não encontrado na URL.');
}

async function buscarDetalhesLocal(id) {
  try {
    const response = await fetch(`http://localhost/RS GO PROJETO/model/local.php?id=${id}`);
    const local = await response.json();

    if (local.erro) {
      console.error(local.erro);
      document.getElementById('conteudo').innerText = 'Local não encontrado.';
      return;
    }

    document.getElementById('nome').innerText = local.nome;
    document.getElementById('descricao').innerText = local.descricao;
    document.getElementById('cidade').innerText = local.cidade;
    document.getElementById('categoria').innerText = local.categoria;
    document.getElementById('imagem').src = local.imagem; 

    // Carregar imagens no carrossel
    carregarCarrossel(local.imagens);
  } catch (error) {
    console.error('Erro ao buscar os detalhes do local:', error);
  }
}

// Variável para o Swiper (declarada fora das funções para reutilização)
let swiper;

// Função para preencher o carrossel de imagens
function carregarCarrossel(imagens) {
  const carrosselContainer = document.querySelector('.swiper-wrapper'); // Classe do contêiner no HTML (Swiper usa .swiper-wrapper)

  // Limpando o carrossel antes de adicionar novas imagens
  carrosselContainer.innerHTML = '';

  imagens.forEach(imagem => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide'); // Classe necessária para cada slide no Swiper

    const imgElement = document.createElement('img');
    imgElement.src = imagem;
    imgElement.alt = 'Imagem do local';

    slide.appendChild(imgElement);
    carrosselContainer.appendChild(slide);
  });

  // Verifica se o Swiper já foi inicializado
  if (swiper) {
    swiper.update(); // Atualiza o Swiper para reconhecer os novos slides
  } else {
    // Inicializa o Swiper
    swiper = new Swiper('.swiper', {
      loop: true, // Faz o carrossel voltar ao início depois de chegar ao fim
      autoplay: {
        delay: 3000, // Intervalo entre cada slide (em milissegundos)
      },
      navigation: {
        nextEl: '.swiper-button-next', // Botão de próxima imagem
        prevEl: '.swiper-button-prev', // Botão de imagem anterior
      },
      pagination: {
        el: '.swiper-pagination', // Indicadores de navegação (se necessário)
        clickable: true,
      },
       slidesPerView: 3, // Número de imagens visíveis por vez
  spaceBetween: 10, // Espaço entre as imagens (em pixels)
    });
  }
}