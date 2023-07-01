const {Server} = require("socket.io");

const io = new Server (8005,{
    cors:true,
})

io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("joinRoom",(data)=>{
        socket.join(data);
        console.log(`Client joined the room: ${data}`);
    })

    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);
        console.log(`Client left room: ${roomName}`);
    });

    socket.on("sendmessage",(data)=>{
        const {Room,message} = data;
        socket.to(Room).emit("rec",message);
    })

})