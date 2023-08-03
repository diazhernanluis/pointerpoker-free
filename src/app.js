import "dotenv/config";
import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import config from "./config/config.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('./public'));

app.get('/:id', (req, res) => {
    // TODO:
    // El id que ingresa por params va a ser el id con el que se va a guardar la session en la DB
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', channel => {
    // logica de negocio
});



server.listen(config.server, () => { console.log(`Running on port: ${config.server}`)});