// Aqui no controller será armazenada toda a lógica de uma jogada. O controle de qual o jogador e as funções que validam se alguém ganhou ou se deu empate
var importedJogador = document.createElement('script');
importedJogador.src = '../../../Model/Jogador.js';
document.head.appendChild(importedJogador); // Importado JS do jogador

// Usado para adicionar imagem na tabela
function addImage(linha, coluna, imagem) { 
    var elem_img = linha.getElementsByTagName("td")[coluna];

    elem_img = document.createElement('img');

    elem_img.style = "height:8rem";

    elem_img.src = imagem;
    linha.getElementsByTagName("td")[coluna].appendChild(elem_img);
}

function verificaVencedor(tamanho, incrementoFor, incrementoComparativo) {
    // Logica para verificar Linha, coluna e diagonal principal
    for (var i=0; i<=tamanho; i += incrementoFor){
        if (document.getElementById(i).innerHTML){
            if ((document.getElementById(i).innerHTML == document.getElementById(i + incrementoComparativo).innerHTML) && 
                (document.getElementById(i).innerHTML == document.getElementById(i + (incrementoComparativo * 2)).innerHTML)) 
            {
                                
                if (document.getElementById(i).innerHTML == '<img src="../../shared/imgs/x.svg" style="height: 8rem;">'){
                    mostrarPopup(-1);
                    
                } else if (document.getElementById(i).innerHTML == '<img src="../../shared/imgs/o.svg" style="height: 8rem;">') {
                    mostrarPopup(1);
                    
                }
            } 
        }
    }

    // Compara se a diagonal secundaria foi fechada
    if (document.getElementById(2).innerHTML){
        if ((document.getElementById(2).innerHTML == document.getElementById(4).innerHTML) && 
            (document.getElementById(2).innerHTML == document.getElementById(6).innerHTML))
        {
            
            if (document.getElementById(2).innerHTML == '<img src="../../shared/imgs/x.svg" style="height: 8rem;">'){
                mostrarPopup(-1);
                
            } else if (document.getElementById(2).innerHTML == '<img src="../../shared/imgs/o.svg" style="height: 8rem;">') {
                mostrarPopup(1);
                
            }
        }
    }

    // Verifica se deu velha
    var velha = 0;
    for (var i=0; i<9; i++){
        if (!document.getElementById(i).innerHTML){
            break;
        } else if (document.getElementById('body-popup')){
            break;
        } else {      
            velha ++;
            if (velha == 9){
                mostrarPopup(0);    
            }
        }
    }
}

//Mostrar jogadas na tabela
function jogada(linha, coluna){
    var linhaTabela = document.getElementsByTagName("tr")[linha]; // Recupera a linha da jogada
    linhaTabela.getElementsByTagName("td")[coluna].style.pointerEvents = 'none'; // Bloqueia a [linha, coluna] para impossibilitar novos cliques

    verificarJogador();
    this.addImage(linhaTabela, coluna, imagemJogador);
    
    var jogadorVitorioso = 0;
    this.verificaVencedor(8, 3, 1); // Compara se a LINHA foi fechada
    this.verificaVencedor(2, 1, 3); // Compara se a COLUNA foi fechada
    this.verificaVencedor(0, 1, 4); // Compara se a DIAGONAL PRINCIPAL foi fechada 
}