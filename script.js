const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");
const contador = document.querySelector("#contador");

let publicacoes = [];

function renderizarPublicacoes(lista) {
  painel.replaceChildren();

  lista.forEach((publicacao) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    const identificacao = document.createElement("span");
    identificacao.classList.add("identificacao");
    identificacao.textContent = `PUBLICAÇÃO #${publicacao.id}`;

    const titulo = document.createElement("h2");
    titulo.textContent = publicacao.title;

    const texto = document.createElement("p");
    texto.textContent = publicacao.body;

    cartao.append(identificacao, titulo, texto);
    painel.append(cartao);
  });

  contador.textContent =
    `${lista.length} ${lista.length === 1 ? "publicação" : "publicações"}`;
}

function filtrarPublicacoes() {
  const termo = filtro.value.trim().toLowerCase();

  const encontradas = publicacoes.filter((item) => {
    return item.title.toLowerCase().includes(termo);
  });

  renderizarPublicacoes(encontradas);

  if (encontradas.length === 0) {
    mensagem.textContent = termo
      ? "Nenhuma publicação encontrada com esse título."
      : "Nenhuma publicação disponível.";
  } else {
    mensagem.textContent = "";
  }
}

function carregarPublicacoes() {
  mensagem.textContent = "Carregando publicações...";
  botao.disabled = true;

  fetch(URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      return resposta.json();
    })
    .then((dados) => {
      publicacoes = dados;
      filtrarPublicacoes();
    })
    .catch((erro) => {
      console.error(erro);
      publicacoes = [];
      renderizarPublicacoes([]);
      mensagem.textContent =
        "Não foi possível carregar as publicações. Verifique sua conexão e tente novamente.";
    })
    .finally(() => {
      botao.disabled = false;
    });
}

botao.addEventListener("click", carregarPublicacoes);
filtro.addEventListener("input", filtrarPublicacoes);