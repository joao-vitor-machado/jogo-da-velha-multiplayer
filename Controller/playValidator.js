// Aqui no controller será armazenada toda a lógica de uma jogada. O controle de qual o jogador e as funções que validam se alguém ganhou ou se deu empate
var jogador = 1;

// Usado para adicionar imagem na tabela
function addImage(linha, coluna, image) { 
    var elem_img = linha.getElementsByTagName("td")[coluna];

    elem_img = document.createElement('img');
    elem_img.src = image;
    linha.getElementsByTagName("td")[coluna].appendChild(elem_img);
}

//Mostrar jogadas na tabela
function mostrar(linha, coluna){
    var table = document.getElementsByTagName("tr")[linha];
    table.getElementsByTagName("td")[coluna].style.pointerEvents = 'none'; 

    if (jogador == 1){
        this.addImage(table, coluna, '../../shared/imgs/x.svg');  
        document.getElementById('img-id-player').src = '../../shared/imgs/o.svg';
        
        jogador = 2;            
    } else {
        this.addImage(table, coluna, '../../shared/imgs/o.svg');  
        document.getElementById('img-id-player').src = '../../shared/imgs/x.svg'

        jogador = 1;
    }

    // Compara se a linha foi fechada
    for (var i=0; i<=8; i += 3){
        if (document.getElementById(i).innerHTML){
            if ((document.getElementById(i).innerHTML == document.getElementById(i+1).innerHTML) && 
                (document.getElementById(i).innerHTML == document.getElementById(i+2).innerHTML))
            {
                document.getElementById('vitoria').innerHTML= "Uhuuull Vitória do jogador " + document.getElementById(i).innerHTML;
            }
        }
    }

    // Compara se a coluna foi fechada
    for (var i=0; i<=2; i += 1){
        if (document.getElementById(i).innerHTML){
            if ((document.getElementById(i).innerHTML == document.getElementById(i+3).innerHTML) && 
                (document.getElementById(i).innerHTML == document.getElementById(i+6).innerHTML))
            {
                document.getElementById('vitoria').innerHTML= "Uhuuull Vitória do jogador " + document.getElementById(i).innerHTML;
            }
        }
    }

    // Compara se a diagonal principal foi fechada      
    if (document.getElementById(0).innerHTML){
        if ((document.getElementById(0).innerHTML == document.getElementById(4).innerHTML) && 
            (document.getElementById(0).innerHTML == document.getElementById(8).innerHTML))
        {
            document.getElementById('vitoria').innerHTML= "Uhuuull Vitória do jogador " + document.getElementById(0).innerHTML;
        }
    }
    
    // Compara se a diagonal secundaria foi fechada
    if (document.getElementById(2).innerHTML){
        if ((document.getElementById(2).innerHTML == document.getElementById(4).innerHTML) && 
            (document.getElementById(2).innerHTML == document.getElementById(6).innerHTML))
        {
            document.getElementById('vitoria').innerHTML= "Uhuuull Vitória do jogador " + document.getElementById(2).innerHTML;
        }
    }

    // Verifica se deu velha
    var count=0;
    for (var i=0; i<9; i++){
        if (!document.getElementById(i).innerHTML){
            break;
        } else if (document.getElementById('vitoria').innerHTML){
            break;
        } else {      
            count ++;
            if (count == 9){
                document.getElementById('vitoria').innerHTML= "VELHAAA";
            }
        }
    }

}