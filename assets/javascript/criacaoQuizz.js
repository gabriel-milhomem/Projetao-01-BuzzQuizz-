var ulPergunta;
var ulNivel;
var qntsPerguntas = 0;
var qntsNiveis = 0;

function criarPergunta() {
    var novoLi = document.createElement("li");
    var formLi = document.createElement("form");
    ulPergunta = document.querySelector("#listaDePerguntas");

    construirFormLiPergunta(formLi);
    novoLi.appendChild(formLi);
    novoLi.innerHTML += "<button onclick= 'criarPergunta()'> <ion-icon name= 'add-circle'> </ion-icon> </button>";
    ulPergunta.appendChild(novoLi);
    qntsPerguntas++;
}

function criarNivel() {
    var novoLi = document.createElement("li");
    var formLi = document.createElement("form");
    ulNivel = document.querySelector("#listaDeNiveis");

    construirFormLiNivel(formLi);
    novoLi.appendChild(formLi);
    novoLi.innerHTML += "<button onclick= 'criarNivel()'> <ion-icon name= 'add-circle'> </ion-icon> </button>";
    ulNivel.appendChild(novoLi);
    qntsNiveis++;
}

function publicarQuizz() {
    var estaValidado = validarFormulario();

    if(estaValidado) {
        criarObjetoPost()
        qntsPerguntas = 0;
        qntsNiveis = 0;
        ulNivel.innerHTML= "";
        ulPergunta.innerHTML= "";
        resetarInputs();
        transicaoDeTela(telaCriacao, "telaCriacaoQuizz", listaQuizz, "telaListaQuizz");
    }
    

}

function validarFormulario() {
    var todosInputs = document.querySelectorAll("#construirQuizz input");
    var perguntas = document.querySelectorAll(".inputPergunta");
    var textArea = document.querySelector("textarea");
    var naoTemErro;

    espacosInput(todosInputs, textArea);
    naoTemErro = temInputVazio(todosInputs, textArea);
    if(!naoTemErro) {
        console.log("AAAAAAA");
        return naoTemErro;
    }

    capitalizeInput(todosInputs, textArea);
    naoTemErro = validarInterrogacao(perguntas);
    return naoTemErro;
}

function espacosInput(todosInputs, textArea) {
    for(var i = 0; i < todosInputs.length; i++) {
        todosInputs[i].value = todosInputs[i].value.trim()
        textArea.value = textArea.value.trim();
    }
}

function temInputVazio(todosInputs, textArea) {
    var alertaForm = document.querySelector("#erroForm");
    
    if(textArea.value.length === 0) {
        var alerta = "Preencha todos os campos, por favor !";
        renderizarErro(alerta, alertaForm);
        return false;
    }

    for(var i = 0; i < todosInputs.length; i++) {
        if(todosInputs[i].value.length === 0) {
            var alerta = "Preencha todos os campos, por favor !";
            renderizarErro(alerta, alertaForm);
            return false;
        }
    }

    return true;

}

function capitalizeInput(todosInputs, textArea) {
    textArea.value = textArea.value.charAt(0).toUpperCase() + textArea.value.slice(1);

    for(var i = 0; i < todosInputs.length; i++) {
        var texto = todosInputs[i].value;
        todosInputs[i].value = texto.charAt(0).toUpperCase() + texto.slice(1);
    }
}

function validarInterrogacao(perguntas) {
    var alertaForm = document.querySelector("#erroForm");

    for(var i = 0; i < perguntas.length; i++) {
        var texto = perguntas[i].value
        if(texto.indexOf("?") === -1) {
            var alerta = "Corrija os dados: coloque '?' na pergunta !";
            renderizarErro(alerta, alertaForm);
            return false;
        }

        else {
            if(texto.indexOf("?") !== texto.length - 1) {
                console.log("aaaaaaaaaaaa");

                var alerta = "Corrija os dados: coloque ' ? ' no fim da pergunta !";
                renderizarErro(alerta, alertaForm);
                return false;
            }
        }

    }

    return true;
}

function criarObjetoPost() {
    var formNivel = document.querySelectorAll("#listaDeNiveis form");
    var formPergunta = document.querySelectorAll("#listaDePerguntas form");
    var valorTitle = document.querySelector("#inputTitulo").value;
    var objeto = 
    {
        title: valorTitle, 
        data: { 
            perguntas: [],
            niveis: []
        }
    };
    
    objeto = criarObjetoNiveis(objeto, formNivel);
    objeto = criarObjetoPerguntas(objeto, formPergunta);
    enviarObjetoPost(objeto);
}

function criarObjetoNiveis(objeto, formNivel) {
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

    return objeto;
}

function criarObjetoPerguntas(objeto, formPergunta) {
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

    return objeto;
}

function enviarObjetoPost(objeto) {
    var config = {headers: {"User-Token": token} };
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", objeto, config);
    
    requisicao.then(pegarListasServidor);
}

function resetarInputs() {
    var alertaForm = document.querySelector("#erroForm");
    var todosInputs = document.querySelectorAll("#construirQuizz input");

    alertaForm.innerHTML = "";
    for(var i = 0; i < todosInputs.length; i++) {
        todosInputs[i].value = "";
    }
}


function construirFormLiPergunta(formLi) {
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
}

function construirFormLiNivel(formLi){
    formLi.innerHTML =  " <h2> Nivel " + (qntsNiveis + 1) + "</h2>"; 
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Mínima de acerto do nível'/>";
    formLi.innerHTML += "<input class= 'larguraMetade' type= 'text' placeholder= '% Máxima de acerto do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Título do nível'/>";
    formLi.innerHTML += "<input type= 'text' placeholder= 'Link da imagem do nível'/>";
    formLi.innerHTML += "<textarea class= 'caixaMaior' cols= '40' rows= '2' placeholder= 'Descrição do nível'></textarea>";
}