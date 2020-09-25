var interfaceJogo;
var ind = 0;
var qualNivel = 0;
var quizz;
var interfaceFinal;

function iniciarJogo(id) {
    interfaceJogo = document.querySelector("#interfaceQuizz");
    transicaoDeTela(listaQuizz, "telaListaQuizz", interfaceJogo, "telaJogo");
    for(var i = 0; i < listaServidor.length; i++) {
        if(listaServidor[i].id === id) {
            quizz = listaServidor[i];
            renderizarTelaJogo();
        }
    }
}

function renderizarTelaJogo() {
    var titulo = document.querySelector("#interfaceQuizz h1");
    var textoPergunta = document.querySelector("#interfaceQuizz h2");
    var resposta = document.querySelectorAll("#interfaceQuizz figcaption");
    var imagens = document.querySelectorAll("#interfaceQuizz figure");
    var perguntas = quizz.data.perguntas[ind];

    titulo.innerText = quizz.title;
    textoPergunta.innerHTML = "<span>" + (ind + 1) + ". </span>" + perguntas.titulo;
    for(var j = 0; j < 4; j++) {
        resposta[j].innerHTML = "<p>" + perguntas.respostas[j].texto + "</p>";
        imagens[j].innerHTML = "<img src= '" + perguntas.respostas[j].link + "'/>";
    }

    ind++;
    console.log(quizz);
}

function selecionarOpcao() {
    if(ind < quizz.data.perguntas.length) {
        renderizarTelaJogo();
    }

    else {
        iniciarInterfaceFinal();
    }
}

function iniciarInterfaceFinal() {
    interfaceFinal = document.querySelector("#interfaceFinal");
    transicaoDeTela(interfaceJogo, "telaJogo", interfaceFinal, "telaFinal");
    renderizarTelaFinal();
}

function renderizarTelaFinal() {
    var titulo = document.querySelector("#interfaceFinal h1");
    var tituloNivel = document.querySelector("#interfaceFinal h3");
    var descricao = document.querySelector("#interfaceFinal p");
    var listaSpans = document.querySelectorAll(".cabecalhoArticle span");
    var imagem = document.querySelector("#interfaceFinal figure");
    //var acertos = listaSpans[0];
    var totalPerguntas = listaSpans[1];
    //var score = listaSpans[2];
    var niveis = quizz.data.niveis[qualNivel];

    
    totalPerguntas.innerText = quizz.data.perguntas.length;
    titulo.innerText = quizz.title
    imagem.innerHTML = "<img src='" + niveis.linkNivel + "'/>"
    tituloNivel.innerText = niveis.tituloNivel;
    descricao.innerText = niveis.descri;
}