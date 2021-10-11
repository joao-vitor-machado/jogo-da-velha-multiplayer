//aqui eu não mudei nada, só o parâmetro que tava passando
document.querySelector("button").addEventListener("click", function(){
    mostrarPopup(1);
})

//aqui eu fiz várias alterações, nome de var, tirei alguns trechos, etc
function mostrarPopup(elementoJogador){

    //Criando a div que será o nosso body - mantive igual
    var body = document.createElement("div");
    body.id = "body-popup";

    //Criando a div que vai armazenar tudo - mantive igual
    var div = document.createElement("div");
    div.id = "div-popup";

    //Criando o label - alterei td
    var divImagemJogador = document.createElement("div");
    divImagemJogador.id = "div-imagem-jogador";

    var imgJogador = document.createElement("img");
    imgJogador.id = "img-jogador";

    //Selecionando a imagem correta - alterei as opções 
    switch (elementoJogador) {
        case 1:
            imgJogador.src = "../../shared/imgs/o.svg";
            break;
        case 2:
            imgJogador.src = "../../shared/imgs/x.svg";
            break;
    }

    //Inserindo todos os elementos ao popup - só tirei a div de botões, que a minha não tem
    // div.appendChild(resultado);
    divImagemJogador.appendChild(imgJogador);
    div.appendChild(divImagemJogador);

    //Adicionando o pop-up ao body - não alterei nada
    body.appendChild(div);

    document.querySelector("body").appendChild(body);

}