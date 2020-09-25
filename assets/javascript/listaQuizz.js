var telaCriacao;
var listaServidor;

function pegarListasServidor() {
    var config = { headers: {"User-Token": token} };
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", config);
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
        novoLi.setAttribute("onclick", "iniciarJogo(" + id +")");
        novoLi.innerHTML = "<p>" + titulo + "</p>";
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
<<<<<<< HEAD
    window.scrollTo(0, 0);
=======
    window.scrollTo(0,0);
>>>>>>> master
}