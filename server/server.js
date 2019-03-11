const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
require('./config/config');
const app = express();
let server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));


//conexion a mongodb
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true },(error, res)=>{
    if (error) throw error;
    console.log('Base de datos online')
});

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
