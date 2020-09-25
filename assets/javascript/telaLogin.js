var botaoEnviar; 
var token;
var cabecalho;
var telaLogin;
var listaQuizz;
var emailUsuario;
var senhaUsuario;

function entrarSite() {
    botaoEnviar = document.querySelector("#telaCadastro button");
    emailUsuario = document.querySelector("#inputEmail");
    senhaUsuario = document.querySelector("#inputSenha");
    var cadastro = {email: emailUsuario.value, password: senhaUsuario.value};
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
    window.scrollTo(0, 0);
    ondeColocar.innerHTML = "<strong>" + alerta + "</strong>";
}

function emailSenhaIncorreto() {
    alertasLogin(false);
    botaoEnviar.disabled = false;
}

function iniciarListagemQuizz(resposta) {
    resetarTelaLogin();
    token = resposta.data.token;
    telaLogin = document.querySelector("#telaCadastro");
    listaQuizz = document.querySelector("#bibliotecaQuizz");
    cabecalho = document.querySelector("header");

    cabecalho.classList.add("aparecerHeader");
    transicaoDeTela(telaLogin, "telaLogin", listaQuizz, "telaListaQuizz");
    pegarListasServidor();
}

function resetarTelaLogin() {
    var alertaLogin = document.querySelector("#erroLogin");

    botaoEnviar.disabled = false;
    emailUsuario.value = "";
    senhaUsuario.value = "";
    alertaLogin.innerHTML= "";
}

function voltarLogin() {
    sairDaTelaAtualEIrPara(telaLogin, "telaLogin");
    cabecalho.classList.remove("aparecerHeader");
}

function sairDaTelaAtualEIrPara(irTela, classeIrTela) {
    var telas = document.querySelectorAll("section");
    var classesDasTelas = ["telaLogin", "telaListaQuizz", "telaCriacaoQuizz", "telaJogo", "telaFinal"];
    for(var i = 0; i < telas.length; i++) {
        if(telas[i].classList.contains("esconderTela") !== true) {
<<<<<<< HEAD
            if(classesDasTelas[i] === "telaCriacaoQuizz"){
=======
            if(classesDasTelas[i] === "telaCriacaoQuizz") {
>>>>>>> master
                resetarFormulario();
            }

            transicaoDeTela(telas[i], classesDasTelas[i] , irTela, classeIrTela);
        }
    }

    acertos = 0;
    ind = 0;
}

function transicaoDeTela(telaAgora, telaAgoraClass, proximaTela, proximaTelaClasse) {
    telaAgora.classList.remove(telaAgoraClass);
    telaAgora.classList.add("esconderTela");
    proximaTela.classList.remove("esconderTela");
    proximaTela.classList.add(proximaTelaClasse);
}