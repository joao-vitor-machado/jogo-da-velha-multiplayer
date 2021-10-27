
import websockets
import asyncio
import json
from game import Tabuleiro 
from retorno import enviarRetorno

PORT = 7890


print("Starteed server and it's listening on port " + str(PORT))

connected = set()
tabuleiro = Tabuleiro()
# jogadores = [-1, 1] # O e X
contadorjogadores = 0 # vai controlar a determinação de jogadores conforme a chegada no server


def resetServer():
    tabuleiro.resetTabuleiro()



async def echo(websocket, path):
    global contadorjogadores
    global tabuleiro

    resetServer()

    #Primeira conexão
    print("A client just connected")
    if len(connected) < 2:
        connected.add(websocket)
        if len(connected) == 2:
        # Envia qual o jogador que o cliente representará quando ele se conectar
            await list(connected)[0].send(json.dumps({ 'jogador': -1}))
            await list(connected)[1].send(json.dumps({ 'jogador': 1}))
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

