var interfaceJogo;
var ind = 0;
var quizz;
var resposta;
var listaRespostas;
var totalPerguntas;

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
    resposta = document.querySelectorAll("#interfaceQuizz figcaption");
    var imagens = document.querySelectorAll("#interfaceQuizz figure");
    var perguntas = quizz.data.perguntas[ind];
    listaRespostas = perguntas.respostas.sort(comparador);

    titulo.innerText = quizz.title;
    textoPergunta.innerHTML = "<span>" + (ind + 1) + ". </span>" + perguntas.titulo;
    for(var j = 0; j < 4; j++) {
        resposta[j].innerHTML = "<p>" + listaRespostas[j].texto + "</p>";
        imagens[j].innerHTML = "<img alt= '" + listaRespostas[j].link + "'/>";
    }

    ind++;
}

function selecionarOpcao(cartaSelecionada) {
    totalPerguntas = quizz.data.perguntas.length;
    corNoFundo();
    interarAcerto(cartaSelecionada);
    
    if(ind < totalPerguntas) {
        setTimeout(resetarFundo, 2000);
    }

    else {
        qualNivelEh();
        setTimeout(iniciarInterfaceFinal, 2000);
    }
}


function corNoFundo(carta) {
    for(var j = 0; j < 4; j++) {
        if(listaRespostas[j].ehResp === true) {
            resposta[j].classList.add("fundoVerde");
        }

        else {
            resposta[j].classList.add("fundoVerm");
        }
    }
}

function resetarFundo() {
    for(var j = 0; j < 4; j++) {
        if(listaRespostas[j].ehResp === true) {
            resposta[j].classList.remove("fundoVerde");
        }

        else {
            resposta[j].classList.remove("fundoVerm");
        }
    }
    
    renderizarTelaJogo();
}

function comparador() { 
    return Math.random() - 0.5;
}