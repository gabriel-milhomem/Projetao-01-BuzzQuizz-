
var listaQuizz = [{title: "QUAO BOM VC É SOBRE GLOBO"}, {title: "QUAO BOM VC É SOBRE BOZONARO"}, {title: "QUAO BOM VC É SOBRE HARRY POTTER"}, {title: "COZINHA"}, {title: "LEGUE OF LEGENDS"}, {title: "PNEUMOUTRAPICONIOTICO"}];
renderizarListaQuizz();
function renderizarListaQuizz() {
    var ul = document.querySelector("#listaDeQuizz");
    for(var i = 0; i < listaQuizz.length; i++) {
        var titulo = listaQuizz[i].title;
        var novoLi = document.createElement("li");
        novoLi.innerHTML = "<p>" + titulo + "</p>";
        ul.appendChild(novoLi);
    }
}