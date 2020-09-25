var telaCriacao;

function pegarListasServidor() {
    var config = { headers: {"User-Token": token} };
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", config);
    requisicao.then(renderizarListaQuizz);
}

function renderizarListaQuizz(resposta) {
    var listaServidor = resposta.data;
    var ul = document.querySelector("#listaDeQuizz");

    console.log(listaServidor);
    ul.innerHTML= "";
    for(var i = -1; i < listaServidor.length; i++) {
        var novoLi = document.createElement("li");
        
        if(i == -1) {
            caixaNovoQuizz(novoLi, ul);
            continue;
        }

        var titulo = listaServidor[i].title;
        novoLi.setAttribute("onclick", "iniciarJogo()");
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
}