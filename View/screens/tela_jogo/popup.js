function mostrarPopup(numeroResultado){

//Criando a div que será o nosso body
var body = document.createElement("div");
body.id = "body-popup";

//Criando a div que vai armazenar tudo
var div = document.createElement("div");
div.id = "div-popup";

//Criando o label
var resultado = document.createElement("h2");
resultado.id = "label-result";
if(numeroResultado != 0){
    resultado.textContent = "VITORIA";
}else{
    resultado.textContent = "EMPATE";
}

//criando a div que irá armazenar a imagem do vencedor ou dos dois caso seja empate
var divImagemResultado = document.createElement("div");
divImagemResultado.id = "div-imagem-resultado";

//trazendo a imagem do vencedor
var imgWinner = document.createElement("img");
imgWinner.id = "img-winner";

//Selecionando a imagem correta
switch (numeroResultado) {
    case 1:
        imgWinner.src = "../../shared/imgs/o.svg";
        break;
    case 0:
        imgWinner.src = "../../shared/imgs/XeO.svg";
        break;
    case -1:
        imgWinner.src = "../../shared/imgs/x.svg";
        break;
}

//Criando os botões
 var botaoJogarNovamente = document.createElement("div");
 var botaoSair = document.createElement("div");
 botaoJogarNovamente.className = "button";
 botaoSair.className = "button";

 //Montando o botão de sair do jogo e fazendo as alterações CSS
 var a = document.createElement("a");
 var span = document.createElement("span");
 a.href = "../index.html";
 span.textContent = "Sair";
 a.appendChild(span);
 botaoSair.appendChild(a);
 botaoSair.style = "margin-top: 120px;";

//Montando o botão de Jogar Novamente e fazendo as alterações CSS
 var a2 = document.createElement("a");
 var span2 = document.createElement("span");
 a2.href = "./tela_jogo.html";
 a2.style = "width: 300px; height: 100px"
 span2.textContent = "Jogar Novamente";
 span2.style = "text-align: center;";
 a2.appendChild(span2);
 botaoJogarNovamente.appendChild(a2);

//Criando a div onde ficarão os botões e adicionando eles a ela
var divBtns = document.createElement("div");
divBtns.id = "div-btns";
divBtns.appendChild(botaoJogarNovamente);
divBtns.appendChild(botaoSair);

//Inserindo todos os elementos ao popup
div.appendChild(resultado);
divImagemResultado.appendChild(imgWinner);
div.appendChild(divImagemResultado);
div.appendChild(divBtns);

//Adicionando o pop-up ao body
body.appendChild(div);

document.querySelector("body").appendChild(body);

}

