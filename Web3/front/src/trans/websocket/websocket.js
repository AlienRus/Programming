export async function WSocket(func, url) {
  let ws = new WebSocket("ws://localhost:8080/shopProject-1" + url);
  ws.onmessage = () => {
    func();
    ws.close();
  };
}

export const WSocketV2 = (() => {
  let socket;
  let isInitialized = false;

  const start = (func, url) => {
    if (!isInitialized) {
      socket = new WebSocket("ws://localhost:8080/shopProject-1" + url);
      socket.onmessage = (event) => {
        func(event.data);
      };
      isInitialized = true;
    }
  };

  const stop = () => {
    if (isInitialized) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    }
  };
  
  return {
    start,
    stop,
  };
})();
