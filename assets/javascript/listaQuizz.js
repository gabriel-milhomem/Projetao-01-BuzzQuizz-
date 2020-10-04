var telaCriacao;
var listaServidor;
var liParaExcluir;
var config;

function pegarListasServidor() {
    config = { headers: {"User-Token": token} };
    var urlGetQuizz = "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes";
    var requisicao = axios.get(urlGetQuizz, config);
    requisicao.then(renderizarListaQuizz);
}

function renderizarListaQuizz(resposta) {
    listaServidor = resposta.data;
    var ul = document.querySelector("#listaDeQuizz");

    ul.innerHTML= "";
    for(var i = -1; i < listaServidor.length; i++) {
        var novoLi = document.createElement("li");

        if(i == -1) {
            caixaNovoQuizz(novoLi, ul);
            continue;
        }

        var titulo = listaServidor[i].title;
        var id = listaServidor[i].id;
        novoLi.innerHTML = "<div onclick= 'iniciarJogo(" + id + ")' class= 'corpoCarta'> <p>" + titulo + "</p> </div>";
        novoLi.innerHTML += "<button onclick= 'deletarQuizz(" + id + ", this.parentNode)' class= 'iconeDeletar'> <ion-icon name= 'close-circle-outline'> </ion-icon> </button>";
        ul.appendChild(novoLi);
    }
}

function caixaNovoQuizz(li, ul) {
    li.classList.add("adicionarQuizz");
    li.setAttribute("onclick", "iniciarCriacaoDeQuizz()");
    li.innerHTML = "<p> Novo <br/> Quizz </p>";
    li.innerHTML += "<ion-icon name= 'add-circle'> </ion-icon>";
    ul.appendChild(li);
}

function iniciarCriacaoDeQuizz() {;
    telaCriacao = document.querySelector("#construirQuizz");
    transicaoDeTela(listaQuizz, "telaListaQuizz", telaCriacao, "telaCriacaoQuizz");
    criarPergunta();
    criarNivel();
    window.scrollTo(0,0);
}

function deletarQuizz(id, li) {
    liParaExcluir = li;
    var urlDeletarQuizz = "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/" + id;
    var reqDeletar = axios.delete(urlDeletarQuizz, config);
    reqDeletar.then(excluirQuizzTela);
}

function excluirQuizzTela() {
    liParaExcluir.remove();
}