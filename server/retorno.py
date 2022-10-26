import websockets
import asyncio
import json

async def enviarRetorno(connected, celula_formatada, tabuleiro):

    global contadorjogadores
    try:
        jogador_correto = -1 if tabuleiro.contador_de_jogada % 2 == 0 else 1
        if celula_formatada["jogadorResponsavel"] == jogador_correto:
            retorno = tabuleiro.efetuarJogada(celula_formatada["linha"], celula_formatada["coluna"]) # retorna o código do resultado 
            print(retorno)
            if retorno == 1: 
                for conn in connected:
                    await conn.send(json.dumps({
                        'resultado': "1" # vitória do O
                    }))
            if retorno == -1:
                for conn in connected:
                    await conn.send(json.dumps({
                        'resultado': "-1" # vitória do X
                    }))
            if retorno == 0:
                for conn in connected:
                    await conn.send(json.dumps({
                        'resultado': "0" # empate
                    }))
            if retorno == 100: #caso do jogo não ter acabado ainda
                for conn in connected:
                    await conn.send(json.dumps({
                        'linha': celula_formatada["linha"],
                        'coluna': celula_formatada["coluna"],
                        'jogador': -1 if tabuleiro.contador_de_jogada % 2 == 0 else 1 # está "ao contrário" porque a ideia é que o JSON passe quem vai fazer A PRÓXIMA jogada
                    }))
    except:
        print("fim de jogo")

    try:
            tabuleiro.jogar_novamente.append(celula_formatada["jogarNovamente"])
            print(str(len(tabuleiro.jogar_novamente)))

            if len(tabuleiro.jogar_novamente) == 2:
               
                if tabuleiro.jogar_novamente[0] == True and tabuleiro.jogar_novamente[1] == True:
                    print("fechou")
                    # resetServer()
                    for conn in connected:
                        await conn.send(json.dumps({
                            'jogarNovamente': True
                        }))
                    # for conn in connected:
                    #     await conn.close()
                    #     connected.remove(conn)
                    # print(connected)
                    # print("con")
                # resetServer()
                    
                        
            if tabuleiro.jogar_novamente[0] == False or tabuleiro.jogar_novamente[1] == False:
                    for conn in connected:
                        await conn.send(json.dumps({
                            'jogarNovamente': False
                        }))
                    # resetServer()
                        
                    
                        
    except:
        print("ainda não acabou o jogo")
