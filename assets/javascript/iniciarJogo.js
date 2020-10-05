var interfaceJogo;
var ind = 0;
var quizz;
var resposta;
var listaRespostas;
var totalPerguntas;
var ultimaPergunta = false;
var cliqueCarta = false;

function iniciarJogo(id) {
    interfaceJogo = document.querySelector("#interfaceQuizz");
    transicaoDeTela(listaQuizz, "telaListaQuizz", interfaceJogo, "telaJogo");
    for(var i = 0; i < listaServidor.length; i++) {
        if(listaServidor[i].id === id) {
            quizz = listaServidor[i];
            setTimeout(function() {
                transicaoOpacidade("interfaceQuizz");
            }, 250);
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
        imagens[j].innerHTML = "<img src= '" + listaRespostas[j].link + "'/>";
    }
}

function transicaoOpacidade(tela) {
    console.log(tela);
    var container = document.querySelector("#".concat(tela));
    if(container.classList.contains("opacidadeMax")) {
        container.classList.remove("opacidadeMax");
    }

    else {
        container.classList.add("opacidadeMax");
    }
}

function selecionarOpcao(cartaSelecionada) {
    if(cliqueCarta === true) {
        return;
    }

    totalPerguntas = quizz.data.perguntas.length;
    corNoFundo();
    interarAcerto(cartaSelecionada);
    
    if(ind < totalPerguntas - 1) {
        cliqueCarta = true;
        setTimeout(function() {
            transicaoOpacidade("interfaceQuizz");
            setTimeout(function(){
                resetarFundo();
                setTimeout(function() {
                    transicaoOpacidade("interfaceQuizz");
                }, 1000);
            }, 1000);
            
        }, 1500);
    }

    else {
        qualNivelEh();
        setTimeout(iniciarInterfaceFinal, 1500);
        ultimaPergunta = true;
        cliqueCarta = true;
        setTimeout(resetarFundo, 3000);
    }
}


function corNoFundo() {
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

    if(!ultimaPergunta) {
        ind++;
        renderizarTelaJogo();
    }

    else {
        ultimaPergunta = false;
    }

    cliqueCarta = false;
}

function comparador() { 
    return Math.random() - 0.5;
}