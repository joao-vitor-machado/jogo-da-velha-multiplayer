
import websockets
import asyncio
import json
from game import Tabuleiro 

PORT = 7890


print("Starteed server and it's listening on port " + str(PORT))

connected = set()
tabuleiro = Tabuleiro()
# jogadores = [-1, 1] # O e X
contadorjogadores = 0 # vai controlar a determinação de jogadores conforme a chegada no server


def resetServer():
    tabuleiro.resetTabuleiro()

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


async def echo(websocket, path):
    global contadorjogadores
    global tabuleiro

    resetServer()

    #Primeira conexão
    print("A client just connected")
    if len(connected) < 2:
        connected.add(websocket)
        await list(connected)[contadorjogadores%2].send(json.dumps({ # Envia qual o jogador que o cliente representará quando ele se conectar
            'jogador': tabuleiro.jogadores[contadorjogadores%2]
        }))
        contadorjogadores += 1
    else:    
        await websocket.close()
        print("Limite de players atingido")
        
    #Troca de mensagens
    try:
        async for celula in websocket: # tratamento das requisições recebidas
            celula_formatada = json.loads(celula) #desempacota do JSON para um objeto
            await enviarRetorno(connected, celula_formatada, tabuleiro)
            # for conn in connected: #parte do broadcast 
            #     if conn != websocket:
            #         await conn.send(celula)
    except websockets.exceptions.ConnectionClosed as e:
    #Reset de server
        print("A client just disconnected")
    finally:
    #Encerramento da conexão
        try:
            connected.remove(websocket)
        except:
            print("nenhuma conexão para eliminar")
        
start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

