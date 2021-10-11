window.onload = function() {
    setTimeout(function(){
        mostrarPopup(1);
    }, 1000)
};

function mostrarPopup(elementoJogador){

    //Criando a div que será o nosso body
    var body = document.createElement("div");
    body.id = "body-popup";

    //Criando a div que vai armazenar tudo
    var div = document.createElement("div");
    div.id = "div-popup";

    //Criando o label
    var divImagemJogador = document.createElement("div");
    divImagemJogador.id = "div-imagem-jogador";

    var imgJogador = document.createElement("img");
    imgJogador.id = "img-jogador";

    //Selecionando a imagem correta
    switch (elementoJogador) {
        case 1:
            imgJogador.src = "../../shared/imgs/jogadorO.png";
            break;
        case 2:
            imgJogador.src = "../../shared/imgs/jogadorX.png";
            break;
    }

    //Inserindo todos os elementos ao popup
    divImagemJogador.appendChild(imgJogador);
    div.appendChild(divImagemJogador);

    //Adicionando o pop-up ao body
    body.appendChild(div);

    document.querySelector("body").appendChild(body);

}