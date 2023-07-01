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
        socket.to(data.Room).emit("getMessage",{message :data.message, name : data.name});
    })

    socket.on("guessedit",(data)=>{
        socket.to(data.Room).emit("getMessage",`${data.name} guessed it`);
    })

    socket.on("startRoundbtn",(data)=>{
        socket.to(data.Room).emit("startGame",{room:data.Room});
    })
})