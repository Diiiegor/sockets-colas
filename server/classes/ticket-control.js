const ConfigModel = require("../models/config");
const {Ticket} = require('./Ticket');

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        //consulta en base de datos la ultima configuracion se ticketes donde esta el ultimo ticket y su dia
        ConfigModel.findOne({}, {}, {sort: {'_id': -1}}).exec((err, configDb) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!configDb) {
                return this.reiniciarConteo();
            }

            if (configDb.hoy == this.hoy) {
                this.ultimo = configDb.ultimo;
                this.tickets = configDb.tickets;
                this.ultimos4 = configDb.ultimos4;
            } else {
                this.reiniciarConteo();
            }

        })
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log("Se ha inicializado el sistema");
        this.guardarDb();
    }

    siguienteTicket() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDb();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length == 0) {
            return 'No hay mas tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();// elimino el primer elemento del array

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //agrega el item al inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);//borra el ultimo elemento del array
        }
        this.guardarDb();
        return atenderTicket;
    }

    guardarDb() {
        let configmodel = new ConfigModel({
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        });

        configmodel.save((err, configdb) => {
            if (err) {
                console.log("Error guardando en database")
            } else {
                //console.log(configdb)
            }
        });
    }

}


module.exports = {
    TicketControl
};
