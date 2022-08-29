const express = require('express')
const app = express()

const {Server:HttpServer} = require('http')
const {Server:Socket} = require('socket.io')

const ContenedorDB = require('./src/contenedores/ContenedorDB')
const {configMySQL , configSGLite}= require('./src/config')


let mensajes=[]

//instalacion server socket y db


const httpServer= new HttpServer(app)
const io = new Socket(httpServer)

const productosDB = new ContenedorDB(configMySQL.config,configMySQL.table)
const mensajesDB = new ContenedorDB(configSGLite.config, configSGLite.table)

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


io.on('connection',async socket=> {
    console.log('Un cliente se ha conectado');
    
    /* productos */
    
    socket.emit('productos', await productosDB.getAll());
    
    socket.on('update',async producto =>{
        console.log(producto)
         productosDB.addItem(producto)
        //io.socket.emit('productos',await productosDB.getAll())
        
    })
    
    
    /* mensajes */  
  
    socket.emit('mensajes', mensajes); 
    
    socket.on('newMensajes', function(data) {
        console.log(data)
        mensajesDB.push(data); 
        io.sockets.emit('mensajes', mensajesDB); 
    });
});     





const PORT = process.env.PORT || 8080;

const srv = httpServer.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))
