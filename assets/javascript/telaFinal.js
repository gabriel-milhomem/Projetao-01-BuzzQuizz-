var score;
var qualNivel;
var interfaceFinal;
var acertos = 0;

function interarAcerto(selecionada) {
    if(listaRespostas[selecionada].ehResp === true) {
        acertos++;
    }
}

function qualNivelEh() {
    var listaNivel= quizz.data.niveis;
    score = Math.round((acertos / totalPerguntas) * 100) ;
    for(var i = 0; i < listaNivel.length; i++) {
        if(score >= listaNivel[i].min && score <= listaNivel[i].max) {
            qualNivel = i;
        }
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
    var listaSpans = document.querySelectorAll("#resultadoQuizz span");
    var imagem = document.querySelector("#interfaceFinal figure");
    var totalAcertos = listaSpans[0];
    var totPergunta = listaSpans[1];
    var resulScore = listaSpans[2];
    var niveis = quizz.data.niveis[qualNivel];

    resulScore.innerText = score;
    totalAcertos.innerText = acertos;
    totPergunta.innerText = totalPerguntas;
    titulo.innerText = quizz.title;
    tituloNivel.innerText = niveis.tituloNivel;
    descricao.innerText = niveis.descri;
    imagem.innerHTML = "<img src= '" + niveis.linkNivel + "'/>";
    ind = 0;
    acertos = 0;
}

function voltarHome() {
    sairDaTelaAtualEIrPara(listaQuizz, "telaListaQuizz");
}
