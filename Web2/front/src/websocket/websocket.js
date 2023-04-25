export async function WSocket(func, url) {
    let ws = new WebSocket('ws://localhost:8080/shopProject-1' + url);
    ws.onmessage = () => {
        func();
        ws.close();
    }
}

export async function WSocketTm(func, url) {
    let ws = new WebSocket('ws://localhost:8080/shopProject-1' + url);
    ws.onmessage = (event) => {
        func(event.data);
        ws.close();
    }
}
