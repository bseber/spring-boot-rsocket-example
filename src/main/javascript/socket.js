import {
    BufferEncoders,
    JsonSerializer,
    RSocketClient,
    APPLICATION_JSON,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    encodeRoute, MESSAGE_RSOCKET_ROUTING, encodeCompositeMetadata, IdentitySerializer
} from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";

const client = new RSocketClient({
    serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
    },
    setup: {
        keepAlive: 999999,
        lifetime: 999999,
        dataMimeType: APPLICATION_JSON.string,
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        payload: {
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute("setup")],
            ])
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
