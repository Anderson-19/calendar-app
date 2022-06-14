require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Conexion a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    } 

    middlewares(){
        //CORS 
        this.app.use( cors() );

        //Public
        this.app.use( express.static('public') );

        //Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: false}) ); 
    }

    routes() {
        this.app.use( '/auth', require('./routes/auth') );
        this.app.use( '/event', require('./routes/events') );
    } 


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server run in http://localhost:${this.port}`);
        })
    }
}

const server = new Server()

server.listen();