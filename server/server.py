
import websockets
import asyncio
import json
from game import Tabuleiro 

PORT = 7890


print("Starteed server and it's listening on port " + str(PORT))

connected = set()
tabuleiro = Tabuleiro()

async def enviarRetorno(connected, celula_formatada):
    retorno = tabuleiro.efetuarJogada(celula_formatada["linha"], celula_formatada["coluna"])
    print(retorno)
    if retorno == 1:
         for conn in connected:
            await conn.send(json.dumps({
                'resultado': "1" # O
            }))
    if retorno == -1:
         for conn in connected:
            await conn.send(json.dumps({
                'resultado': "-1" # X
            }))
    if retorno == 0:
         for conn in connected:
            await conn.send(json.dumps({
                'resultado': "0" # empate
            }))
    if retorno == 100:
        for conn in connected:
            await conn.send(json.dumps({
                'linha': celula_formatada["linha"],
                'coluna': celula_formatada["coluna"],
                'jogador': -1 if tabuleiro.contador_de_jogada % 2 == 0 else 1 # está "ao contrário" porque a ideia é que o JSON passe quem vai fazer A PRÓXIMA jogada
            }))

async def echo(websocket, path):
    print("A client just connected")
    connected.add(websocket)
    # for conn in connected:
    #     await conn.send(json.dumps({
    #         'jogadorInicial':-1
    #     }))
    try:
        async for celula in websocket:
            celula_formatada = json.loads(celula)
            await enviarRetorno(connected, celula_formatada)
            for conn in connected:
                if conn != websocket:
                    await conn.send("Someone said: " + celula_formatada)
    except websockets.exceptions.ConnectionClosed as e:
        tabuleiro.resetTabuleiro()
        print("A client just disconnected")
    finally:
        connected.remove(websocket)
        
start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

