# spring boot rsocket example

start the app:

```bash
./mvnw spring-boot:run
```

open `http://localhost:8080` in the browser.

The browser console should log something like "websocket connection established."
The bash should log something like "ConnectMapping succeeded". (or not depends on the use case

* commit `f90764a` works
* commit `6d56bac` does not work (`@ConnectMapping` with a route)
* `main` branch is configured and implemented correctly. `@ConnectMapping` with a route works as intended.

## ConnectMapping

`@ConnectMapping` is called when client establishes a rsocket connection without sending a payload.

```java
@Controller
public class WsController {

    @ConnectMapping
    public Mono connect() {
        System.out.println("Works.");
        return Mono.empty();
    }
}
```

```js
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
```

## ConnectMapping with a route

`@ConnectMapping` does not work when the client sends a payload with the SETUP frame:
(commit #dec851f)

```java
@Controller
public class WsController {

    @ConnectMapping("setup")
    public Mono connect() {
        System.out.println("Does not work :-(");
        return Mono.empty();
    }
}
```

```js
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
            metadata: String.fromCharCode("setup".length) + "setup"
        }
    },
    transport: new RSocketWebSocketClient(
        {
            debug: true,
            url: `ws://${window.location.host}/rsocket`,
        },
        BufferEncoders,
    ),
});
```

`main` branch works as intended. please see last commits how do it correctly 🙂
