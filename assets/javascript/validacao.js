function validarFormulario() {
    var todosInputs = document.querySelectorAll("#construirQuizz input, textarea");
    var perguntas = document.querySelectorAll(".inputPergunta");
    var todasImagens = document.querySelectorAll(".imagemForm");
    alertaForm = document.querySelector("#erroForm");
    var naoTemErro;

    espacosInput(todosInputs);

    naoTemErro = temInputVazio(todosInputs);
    if(!naoTemErro) {
        return naoTemErro;
    }

    capitalizeInput(todosInputs);

    naoTemErro = validarLink(todasImagens);
    if(!naoTemErro) {
        return naoTemErro;
    }

    naoTemErro = verificarNumero();
    if(!naoTemErro) {
        return naoTemErro;
    }

    naoTemErro = validarInterrogacao(perguntas);
    return naoTemErro;
}

function espacosInput(todosInputs) {
    for(var i = 0; i < todosInputs.length; i++) {
        todosInputs[i].value = todosInputs[i].value.trim();
    }
}

function temInputVazio(todosInputs) {
    for(var i = 0; i < todosInputs.length; i++) {
        if(todosInputs[i].value.length === 0) {
            var alerta = "Preencha todos os campos, por favor !";
            renderizarErro(alerta, alertaForm);
            return false;
        }
    }

    return true;
}

function capitalizeInput(todosInputs) {
    for(var i = 0; i < todosInputs.length; i++) {
        if(todosInputs[i].classList.contains("imagemForm")) {
            continue;
        }

        var texto = todosInputs[i].value;
        todosInputs[i].value = texto.charAt(0).toUpperCase() + texto.slice(1);
    }
}

function validarLink(todasImagens) {
    console.log(todasImagens);
    for(var i = 0; i < todasImagens.length; i++) {
        var link = todasImagens[i].value.toLowerCase();
        if(link.slice(0,8) !== "https://") {
            var alerta = "Utilize um link de imagem válido";
            renderizarErro(alerta, alertaForm);
            return false;
        }
    }

    return true;
}

function verificarNumero() {
    var min = document.querySelectorAll(".minimo");
    var max = document.querySelectorAll(".maximo");

    for(var i = 0; i < min.length; i++) {
        var minimo = min[i].value;
        var maximo = max[i].value;
        var naoEhNumero = isNaN(minimo) || isNaN(maximo);

        if(naoEhNumero) {
            var alerta = "Digite números em max e min";
            renderizarErro(alerta, alertaForm);
            return false;
        }
    
        else {
            var naoEstaNoLimite = parseFloat(minimo) < 0 || parseFloat(minimo) > 100;
            var naoEstaNoLimite_2 = parseFloat(maximo) < 0 || parseFloat(maximo) > 100;
            var ehMenor = parseFloat(maximo) < parseFloat(minimo);
            
            if(naoEstaNoLimite || naoEstaNoLimite_2) {
                var alerta = "Digite números entre 0 e 100";
                renderizarErro(alerta, alertaForm);
                return false;
            }
    
            if(ehMenor) {
                var alerta = "Max deve ser maior que min";
                renderizarErro(alerta, alertaForm);
                return false;
            }
        }
    }
   
    return true;
}

function validarInterrogacao(perguntas) {
    for(var i = 0; i < perguntas.length; i++) {
        var texto = perguntas[i].value
        if(texto.indexOf("?") === -1) {
            var alerta = "Corrija os dados: coloque '?' na pergunta !";
            renderizarErro(alerta, alertaForm);
            return false;
        }

        else {
            if(texto.indexOf("?") !== texto.length - 1) {
                var alerta = "Corrija os dados: coloque ' ? ' no fim da pergunta !";
                renderizarErro(alerta, alertaForm);
                return false;
            }
        }

    }

    return true;
}