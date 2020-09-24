var botaoEnviar; 
var token;
var cabecalho;
var telaLogin;
var listaQuizz;

function entrarSite() {
    botaoEnviar = document.querySelector(".telaLogin button");
    var emailUsuario = document.querySelector("#inputEmail").value;
    var senhaUsuario = document.querySelector("#inputSenha").value;
    var cadastro = {email: emailUsuario, password: senhaUsuario};
    var campoEmBranco = emailUsuario === "" || senhaUsuario === "";
    var reqLogin;

    if(campoEmBranco) {
        alertaCampoEmBranco(true);
    }
    
    else {
        alertaCampoEmBranco(false);
        botaoEnviar.disabled = true;
        reqLogin = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", cadastro);
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
    token = resposta.data.token;
    telaLogin = document.querySelector("#telaCadastro");
    listaQuizz = document.querySelector("#bibliotecaQuizz");
    cabecalho = document.querySelector("header");

    cabecalho.classList.add("aparecerHeader");
    transicaoDeTela(telaLogin, "telaLogin", listaQuizz, "telaListaQuizz");
    pegarListasServidor();
}

function transicaoDeTela(telaAgora, telaAgoraClass, proximaTela, proximaTelaClasse) {
    telaAgora.classList.remove(telaAgoraClass);
    telaAgora.classList.add("esconderTela");
    proximaTela.classList.remove("esconderTela");
    proximaTela.classList.add(proximaTelaClasse);
}