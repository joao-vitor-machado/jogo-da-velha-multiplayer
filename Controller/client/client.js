
const WebSocket = require('ws');

const client = new WebSocket("ws://localhost:7890");

client.addEventListener("open", e => {
    client.send(
        JSON.stringify({
                     linha: "linha",
                     coluna: "coluna"
                 })
    );

    client.onmessage = function(event){
        msgm = event.data
        console.log(msgm);
    }
})