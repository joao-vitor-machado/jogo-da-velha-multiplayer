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
            imgJogador.style = "width:100vw;";
            break;
        case 2:
            imgJogador.src = "../../shared/imgs/jogadorX.png";
            imgJogador.style = "width:100vw;";
            break;
    }

    
    //Adicionando imagem ao slide
    divImagemJogador.appendChild(imgJogador);

    //Animando a imagem
    imgJogador.animate([
        //keyframes
      
      { transform: 'translateX(100%)' },
       
       { transform: 'translateX(0%)' },
       
       {transform: 'translateX(-100%)'}
     ], {
        //timing options
       duration: 6000,
       fill: "both",
     });
   
    //Adicionando a imagem e sua div ao body-img
    div.appendChild(divImagemJogador);
    
    //Adicionando o slide ao body
    body.appendChild(div);

    //Adicionando tudo ao body do html
    document.querySelector("body").appendChild(body);
    
    //Retirando o slide do html para acessar o jogo
    setTimeout(function(){
        document.querySelector("body").removeChild(body);
    }, 6500);

}