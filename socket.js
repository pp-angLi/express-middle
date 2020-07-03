var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 2333
  });
wss.on('connection', function (ws) {
  console.log('服务端：客户端已连接');
  ws.send(JSON.stringify({
    message: 'open success'
  }))
  ws.on('message', function (data) {
    //打印客户端监听的消息
    console.log('send success')
    message = JSON.parse(data).message
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        message
      }))
    })
    // ws.send(JSON.stringify({
    //   message
    // }))
  });
});