
import websockets
import asyncio
import json
from game import Tabuleiro 

PORT = 7890


print("Starteed server and it's listening on port " + str(PORT))

connected = set()
tabuleiro = Tabuleiro()

async def echo(websocket, path):
    print("A client just connected")
    
    connected.add(websocket)
    try:
        async for celula in websocket:
            celula_formatada = json.loads(celula)
            tabuleiro.efetuarJogada(celula_formatada["linha"], celula_formatada["coluna"])
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

