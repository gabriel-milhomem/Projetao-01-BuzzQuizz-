var ulPergunta;
var ulNivel;
var qntsPerguntas = 1;
var qntsNiveis = 1;

function criarPergunta() {
    ulPergunta = document.querySelector("#listaDePerguntas");
    var novoLi = document.createElement("li");
    var formLi = document.createElement("form");
    formLi.innerHTML =  "<h2> Pergunta " + qntsPerguntas + "</h2>"; 
    formLi.innerHTML += "<input class= 'inputPergunta' type= 'text' placeholder= 'Digite a pergunta' maxlength= '100'/>";
    formLi.innerHTML += "<input class= 'fundoVerde' type= 'text' placeholder= 'Digite a resposta correta'/>";
    formLi.innerHTML += "<input class= 'fundoVerde' type= 'text' placeholder= 'Link para imagem correta'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Digite uma resposta errada 1'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Link para imagem errada 1'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Digite uma resposta errada 2'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Link para imagem errada 2'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Digite uma resposta errada 3'/>";
    formLi.innerHTML += "<input class= 'fundoVerm' type= 'text' placeholder= 'Link para imagem errada 3'/>";
    novoLi.appendChild(formLi);
    novoLi.innerHTML += "<button onclick= 'criarPergunta()'> <ion-icon name= 'add-circle'> </ion-icon> </button>";
    ulPergunta.appendChild(novoLi);
    qntsPerguntas++;
}

function criarNivel() {
    ulNivel = document.querySelector("#listaDeNiveis");
    var novoLi = document.createElement("li");
    var formLi = document.createElement("form");
    formLi.innerHTML = "<form> <h2> Nivel " + qntsNiveis + "</h2>"; 
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Mínima de acerto do nível'/>";
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Máxima de acerto do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Título do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Link da imagem do nível'/>";
    formLi.innerHTML += "<textarea name= 'descricao' class= 'caixaMaior' cols= '40' rows= '2' placeholder= 'Descrição do nível'></textarea>";
    novoLi.appendChild(formLi);
    novoLi.innerHTML += "<button onclick= 'criarNivel()'> <ion-icon name= 'add-circle'> </ion-icon> </button>";
    ulNivel.appendChild(novoLi);
    qntsNiveis++;
}

function publicarQuizz() {
    ulPergunta.innerHTML= "";
    ulNivel.innerHTML= "";
    qntsPerguntas = 1;
    qntsNiveis = 1;
    telaCriacao.classList.remove("telaCriacaoQuizz");
    telaCriacao.classList.add("esconderTela");
    listaQuizz.classList.remove("esconderTela");
    listaQuizz.classList.add("telaListaQuizz");
    
    
}