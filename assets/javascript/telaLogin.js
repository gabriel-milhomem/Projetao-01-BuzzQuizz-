var botaoEnviar = document.querySelector(".telaLogin button");
var token;

function entrarSite() {
    var emailUsuario = document.querySelector("#inputEmail").value;
    var senhaUsuario = document.querySelector("#inputSenha").value;
    var campoEmBranco = emailUsuario === "" || senhaUsuario === "";

    if(campoEmBranco) {
        alertaCampoEmBranco(true);
    }
    
    else {
        alertaCampoEmBranco(false);
        botaoEnviar.disabled = true;
        var cadastro = {email: emailUsuario, password: senhaUsuario};
        var reqLogin = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", cadastro);
        reqLogin.then(iniciarListagemQuizz).catch(emailSenhaIncorreto);
    }

}

function alertaCampoEmBranco(existeErro) {
    var alertaLogin = document.querySelector("#alertaLogin");
    if(existeErro) {
        alertaLogin.classList.add("erroLoginInline");
    }

    else {
        alertaLogin.classList.remove("erroLoginInline");
    }
    
}

function emailSenhaIncorreto() {
    var erroServidor = document.querySelector("#erroServidor");
    erroServidor.classList.add("erroLoginInline");
    botaoEnviar.disabled = false;
}

function iniciarListagemQuizz(resposta) {
    var telaLogin = document.querySelector(".telaLogin");
    telaLogin.classList.remove("telaLogin");
    telaLogin.classList.add("esconderTelas");
    token = resposta.data.token;
}