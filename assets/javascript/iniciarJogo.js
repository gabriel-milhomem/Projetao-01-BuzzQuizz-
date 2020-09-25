var interfaceJogo;
var ind = 0;
var qualNivel = 0;
var quizz;
var interfaceFinal;
var resposta;
var listaRespostas;
// var acertos = 0;
var score;
// var totalPerguntas;

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
    console.log(quizz);
}

function selecionarOpcao(cartaSelecionada) {
    totalPerguntas = quizz.data.perguntas.length;
    corNoFundo();
    interarAcerto(cartaSelecionada);
    
    if(ind < totalPerguntas) {
        setTimeout(resetarFundo, 2000);
    }

    else {
        //qualNivelEh();
        setTimeout(iniciarInterfaceFinal, 1000);
    }
}

function interarAcerto(selecionada) {
    if(listaRespostas[selecionada].ehResp === true) {
        acertos++;
    }
}

/*function qualNivelEh() {
    score = Math.round(acertos / totalPerguntas); 
}*/

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

function iniciarInterfaceFinal() {
    interfaceFinal = document.querySelector("#interfaceFinal");
    transicaoDeTela(interfaceJogo, "telaJogo", interfaceFinal, "telaFinal");
    renderizarTelaFinal();
}

function renderizarTelaFinal() {
    var titulo = document.querySelector("#interfaceFinal h1");
    var tituloNivel = document.querySelector("#interfaceFinal h3");
    var descricao = document.querySelector("#interfaceFinal p");
    var listaSpans = document.querySelectorAll("#resultadoQuizz span");
    var imagem = document.querySelector("#interfaceFinal figure");
    var totalAcertos = listaSpans[0];
    var totPergunta = listaSpans[1];
    var resulScore = listaSpans[2];
    var niveis = quizz.data.niveis[qualNivel];

    console.log(listaSpans);
    console.log("Acertos", acertos);
    // totalAcertos.innerText = acertos;
    console.log("Perguntas", totalPerguntas);
    totPergunta.innerText = totalPerguntas;
    titulo.innerText = quizz.title;
    imagem.innerHTML = "<img alt='" + niveis.linkNivel + "'/>";
    tituloNivel.innerText = niveis.tituloNivel;
    descricao.innerText = niveis.descri;
}

function comparador() { 
    return Math.random() - 0.5;
}