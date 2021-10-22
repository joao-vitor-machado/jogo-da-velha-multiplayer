
const WebSocket = require('ws');

const ws = new WebSocket("ws://localhost:7890");

ws.addEventListener("open", e => {
    ws.send(
        JSON.stringify({
                     linha: "linha",
                     coluna: "coluna"
                 })
    );


})