const {Server} = require("socket.io");

const io = new Server (8005,{
    cors:true,
})

io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on('click',(data)=>{
        console.log(data);
    })
})