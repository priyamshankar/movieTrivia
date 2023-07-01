const {Server} = require("socket.io");

const io = new Server (8005,{
    cors:true,
})

io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("roomId",(data)=>{
        socket.join(data);
        console.log(data);
    })

    socket.on("getMessage",(data)=>{
        const {Room,message} = data;
        socket.to(Room).emit("rec",message);
    })
})