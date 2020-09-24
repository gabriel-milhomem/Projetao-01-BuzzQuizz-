var ulPergunta;
var ulNivel;
var qntsPerguntas = 0;
var qntsNiveis = 0;

function criarPergunta() {
    ulPergunta = document.querySelector("#listaDePerguntas");
    var novoLi = document.createElement("li");
    var formLi = document.createElement("form");
    formLi.innerHTML =  "<h2> Pergunta " + (qntsPerguntas + 1)  + "</h2>"; 
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
    formLi.innerHTML =  " <h2> Nivel " + (qntsNiveis + 1) + "</h2>"; 
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Mínima de acerto do nível'/>";
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Máxima de acerto do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Título do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Link da imagem do nível'/>";
    formLi.innerHTML += "<textarea class= 'caixaMaior' cols= '40' rows= '2' placeholder= 'Descrição do nível'></textarea>";
    novoLi.appendChild(formLi);
    novoLi.innerHTML += "<button onclick= 'criarNivel()'> <ion-icon name= 'add-circle'> </ion-icon> </button>";
    ulNivel.appendChild(novoLi);
    qntsNiveis++;
}

function publicarQuizz() {
    criarObjetoPost();
    ulPergunta.innerHTML= "";
    ulNivel.innerHTML= "";
    qntsPerguntas = 0;
    qntsNiveis = 0;
    telaCriacao.classList.remove("telaCriacaoQuizz");
    telaCriacao.classList.add("esconderTela");
    listaQuizz.classList.remove("esconderTela");
    listaQuizz.classList.add("telaListaQuizz");
}

function criarObjetoPost() {
    var formNivel = document.querySelectorAll("#listaDeNiveis form");
    var formPergunta = document.querySelectorAll("#listaDePerguntas form");
    var valorTitle = document.querySelector("#inputTitulo").value;
    var objeto = {
        title: valorTitle, 
        data: { 
            perguntas: [],
            niveis: []
        }
    };
    
    for(var i = 0; i < qntsNiveis; i++) {
        var inputNivel = formNivel[i].querySelectorAll("input");
        var descricao = formNivel[i].querySelector("textarea");
        objeto.data.niveis[i] = {
            min: inputNivel[0].value,
            max: inputNivel[1].value,
            tituloNivel: inputNivel[2].value,
            linkNivel: inputNivel[3].value,
            descri: descricao.value
        };
    }

    for(var i = 0; i < qntsPerguntas; i++) {
        var k = 0;
        var inputPergunta = formPergunta[i].querySelectorAll("input");
        objeto.data.perguntas[i] = {titulo: inputPergunta[k].value, respostas: []};
        k++;
        for(var j = 0; j < 4; j++) {
            if(j == 0) {
                objeto.data.perguntas[i].respostas[j] = {
                    texto: inputPergunta[k].value,
                    link: inputPergunta[k+1].value,
                    ehResp: true
                };
                k += 2;
            }

            else {
                objeto.data.perguntas[i].respostas[j] = {
                    texto: inputPergunta[k].value,
                    link: inputPergunta[k+1].value,
                    ehResp: false
                };
                k += 2;
            }
        }
    }
    console.log(objeto);

    enviarObjetoPost(objeto);
}

function enviarObjetoPost(objeto) {
    var config = {headers: {"User-Token": token} };
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", objeto, config);
    requisicao.then(pegarListasServidor);
}