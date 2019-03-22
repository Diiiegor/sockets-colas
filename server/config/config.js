//=======================
//  Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
//  Entorno
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
//  Base de datos
//=======================
let urlDb;
if (process.env.NODE_ENV == 'dev') {
    urlDb = 'mongodb://localhost:27017/colas';
} else {
    urlDb = process.env.URLDB
}
process.env.URLDB = urlDb;
