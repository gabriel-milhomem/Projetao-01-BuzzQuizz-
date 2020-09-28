function validarFormulario() {
    var todosInputs = document.querySelectorAll("#construirQuizz input");
    var perguntas = document.querySelectorAll(".inputPergunta");
    var textArea = document.querySelector("textarea");
    alertaForm = document.querySelector("#erroForm");
    var naoTemErro;

    espacosInput(todosInputs, textArea);
    naoTemErro = temInputVazio(todosInputs, textArea);
    if(!naoTemErro) {
        return naoTemErro;
    }

    naoTemErro = verificarNumero();
    if(!naoTemErro) {
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

function capitalizeInput(todosInputs, textArea) {
    textArea.value = textArea.value.charAt(0).toUpperCase() + textArea.value.slice(1);

    for(var i = 0; i < todosInputs.length; i++) {
        var texto = todosInputs[i].value;
        todosInputs[i].value = texto.charAt(0).toUpperCase() + texto.slice(1);
    }
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