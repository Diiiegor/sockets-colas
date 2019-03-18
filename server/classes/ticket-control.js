const ConfigModel = require("../models/config");
const {Ticket} = require('./Ticket');

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
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
            } else {
                this.reiniciarConteo();
            }

        })
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
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

    guardarDb() {
        let configmodel = new ConfigModel({
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
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
