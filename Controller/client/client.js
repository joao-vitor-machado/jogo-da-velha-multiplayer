const ws = new WebSocket("ws://localhost:7890");

        ws.addEventListener("open", () => { //ao abrir a conexão o código abaixo será executado

            var celulas = document.querySelectorAll("section table tr td");
            celulas.forEach(celula => {
                //adiciona um eventListener para cada uma das células
                celula.addEventListener("click", () => {
                    ({ linha, coluna } = posicaoToObj(parseInt(celula.id))); // transforma em obj
                    ws.send( // transforma em JSON e envia pro server
                        JSON.stringify({
                            linha: linha,
                            coluna: coluna,
                            jogadorResponsavel: jogador.jogador
                        })
                    )
                })
            });

            var botoesFecharSessao = document.querySelectorAll(".button-close-conec");
            botoesFecharSessao.forEach(btn => {
                btn.addEventListener("click", ()=>{
                ws.close();
            });
            });

            
            ws.addEventListener("message", message => { // define o que acontece quando o computador recebe uma mensagem do server 
                json = message.data;
                mensagem = JSON.parse(json); // transforma o json em um obj

                console.log(mensagem)

                if(mensagem.resultado){ // se o objeto tiver apenas uma propriedade resultado
                    console.log(mensagem.resultado)
                    mostrarPopup(parseInt(mensagem.resultado));
                }else if(mensagem.linha != null && mensagem.coluna != null && mensagem.jogador != null) // se o objeto tiver linha, coluna e jogador diferentes de null, ele efetua a jogada
                {   
                    jogada(mensagem.linha, mensagem.coluna, mensagem.jogador);
                }else if(mensagem.jogador){ // ainda está sendo trabalhado
                    jogador = new Jogador(mensagem.jogador);
                    mostrarJogador(mensagem.jogador);
                }else if(mensagem.jogarNovamente != null){ // em construçao
                    if(mensagem.jogarNovamente == true){
                        location.reload();
                        console.log("aqui")
                    }else{
                        location.replace("../index.html");
                    }
                }
            })
        })