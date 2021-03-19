import { BufferEncoders, JsonSerializer, RSocketClient } from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";

const client = new RSocketClient({
    serializers: {
        data: JsonSerializer,
        metadata: JsonSerializer,
    },
    setup: {
        keepAlive: 999999,
        lifetime: 999999,
        dataMimeType: "application/json",
        metadataMimeType: "message/x.rsocket.routing.v0",
        payload: {
            // data: "hello",
            metadata: String.fromCharCode("setup".length) + "setup"
        }
    },
    transport: new RSocketWebSocketClient(
        {
            debug: true,
            url: "ws://localhost:7000/rsocket",
        },
        BufferEncoders,
    ),
});

client.connect().then(socket => {
    console.log('websocket connection established.');
    console.log('have a look at the server log. maybe there is a @ConnectionMapping log.');
}, (error) => {
    console.error('could not connect websocket', error);
})
