//Armazenar a classe jogador e instanciar dois obejtos (jogadorX e jogadorO)
// Apenas os atributos e getters e setters
var IdentificadorDeJogador = document.getElementById('img-id-player');
var imagemJogador = '';
var jogador = -1;

/* Logica do jogador ====
se 1 então O
se -1 então X
==========================*/

// Função que vai controlar qual imagem deve aparecer
function verificarJogador() {
    if (jogador == -1){
        imagemJogador = '../../shared/imgs/x.svg';
        IdentificadorDeJogador.src = '../../shared/imgs/o.svg'; // Adiciona a imagem do player da vez
        
        
        jogador = 1;  //  Seta "O" como proximo jogador 
    } else if (jogador == 1) {
        imagemJogador = '../../shared/imgs/o.svg';
        IdentificadorDeJogador.src = '../../shared/imgs/x.svg'; // Adiciona a imagem do player da vez
        


        jogador = -1;  //  Seta "O" como proximo jogador 
    }
}