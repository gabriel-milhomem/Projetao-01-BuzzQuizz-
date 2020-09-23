
var listaQuizz = [{title: "QUAO BOM VC É SOBRE GLOBO"}, {title: "QUAO BOM VC É SOBRE BOZONARO"}, {title: "QUAO BOM VC É SOBRE HARRY POTTER"}, {title: "COZINHA"}, {title: "LEGUE OF LEGENDS"}, {title: "PNEUMOUTRAPICONIOTICO"}];
renderizarListaQuizz();
function renderizarListaQuizz() {
    var ul = document.querySelector("#listaDeQuizz");
    ul.innerHTML= "";
    for(var i = -1; i < listaQuizz.length; i++) {
        var novoLi = document.createElement("li");
        if(i == -1) {
            novoLi.classList.add("adicionarQuizz");
            novoLi.setAttribute("onclick", "iniciarCriacaoDeQuizz()");
            novoLi.innerHTML = "<p> Novo <br/> Quizz </p>";
            novoLi.innerHTML += "<ion-icon name= 'add-circle'> </ion-icon>";
            ul.appendChild(novoLi);
            continue;
        }

        var titulo = listaQuizz[i].title;
        novoLi.innerHTML = "<p>" + titulo + "</p>";
        ul.appendChild(novoLi);
    }
}

function iniciarCriacaoDeQuizz() {
    listaQuizz.classList.remove("telaListaQuizz");
    listaQuizz.classList.add("esconderTela");
    telaCriacao = document.querySelector("#construirQuizz");
    telaCriacao.classList.remove("esconderTela");
    telaCriacao.classList.add("telaCriacaoQuizz");
    criarPergunta();
    criarNivel();
}