const express = require('express')
const app = express()
const cors=require("cors")
const server=require("http").Server(app);
const port=3000;
const path=require("path")
app.use(cors());

app.use(express.static(path.join(__dirname,"./uber-app")))

app.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/uber-app/index.html"))
})


const io=require("socket.io")(server,{
    cors:{
        crossOriginIsolated:["http://localhost:4200"]
    }
})
io.on("connection",(socket)=>{
    socket.on("find-driver",({points})=>{
        console.log(server);
        const counter = setInterval(() => {
        const coords = points.shift();
        if (!coords) {
            clearInterval(counter)
        } else {
            socket.emit('position', {coords});
        }
        }, 1000);
    })
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

