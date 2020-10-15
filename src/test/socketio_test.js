// 引入客户端io
import io from "socket.io-client";
// 连接服务器 得到代表连接socket对象
const socket = io("ws://localhost:4000");
// 绑定receiveMsg监听 得到服务器端发送过来的消息
socket.on("receiveMsg", function(data) {
  console.log("浏览器接受到的消息" + data);  
})
// 向服务器发送消息
socket.emit('sendMsg', {name:"Tom", date: Date.now()});
console.log("浏览器向服务器发送消息", {name:"Tom", date: Date.now()});
