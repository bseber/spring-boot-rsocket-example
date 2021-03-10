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
    },
    transport: new RSocketWebSocketClient(
        {
            debug: true,
            url: `ws://${window.location.host}/rsocket`,
        },
        BufferEncoders,
    ),
});

client.connect().then(socket => {
    console.log('websocket connection established.');
    console.log('have a look at the server log. maybe there is a @ConnectionMapping log.');
})
