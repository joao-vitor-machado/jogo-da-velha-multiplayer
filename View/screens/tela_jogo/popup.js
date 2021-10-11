document.querySelector("button").addEventListener("click", function(){
    mostrarPopup(0);
})


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

 var a = document.createElement("a");
 var span = document.createElement("span");
 a.href = "../index.html";
 span.textContent = "Sair";
 a.appendChild(span);
 botaoSair.appendChild(a);
 botaoSair.style = "margin-top: 120px;";

 var a2 = document.createElement("a");
 var span2 = document.createElement("span");
 a2.href = "./tela_jogo.html";
 a2.style = "width: 300px; height: 100px"
 span2.textContent = "Jogar Novamente";
 span2.style = "text-align: center;";

 a2.appendChild(span2);
 botaoJogarNovamente.appendChild(a2);

 


// var botaoJogarNovamente = document.createElement("button");
// botaoJogarNovamente.textContent = "Jogar Novamente";

// var botaoSair = document.createElement("button");
// botaoSair.textContent = "Sair";

var divBtns = document.createElement("div");
divBtns.id = "div-btns";
divBtns.appendChild(botaoJogarNovamente);
divBtns.appendChild(botaoSair);

div.appendChild(resultado);
divImagemResultado.appendChild(imgWinner);
div.appendChild(divImagemResultado);
div.appendChild(divBtns);


body.appendChild(div);

document.querySelector("body").appendChild(body);

}

