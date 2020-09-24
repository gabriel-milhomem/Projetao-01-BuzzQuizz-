var botaoEnviar; 
var token;
var cabecalho;
var telaLogin;
var listaQuizz;

function entrarSite() {
    botaoEnviar = document.querySelector("#telaCadastro button");
    var emailUsuario = document.querySelector("#inputEmail").value;
    var senhaUsuario = document.querySelector("#inputSenha").value;
    var cadastro = {email: emailUsuario, password: senhaUsuario};
    var campoEmBranco = emailUsuario === "" || senhaUsuario === "";
    var reqLogin;

    if(campoEmBranco) {
        alertasLogin(true);
    }
    
    else {
        botaoEnviar.disabled = true;
        reqLogin = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", cadastro);
        reqLogin.then(iniciarListagemQuizz).catch(emailSenhaIncorreto);
    }

}

function alertasLogin(tipoDeErro) {
    var alertaLogin = document.querySelector("#erroLogin");

    if(tipoDeErro) {
        var alerta = "Preencha todos os campos, por favor !";
        renderizarErro(alerta, alertaLogin);
    }

    else {
        var alerta = "Email ou senha incorretos !";
        renderizarErro(alerta, alertaLogin);
    }
}

function renderizarErro(alerta, ondeColocar) {
    ondeColocar.innerHTML = "<strong>" + alerta + "</strong>";
}

function emailSenhaIncorreto() {
    alertasLogin(false);
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