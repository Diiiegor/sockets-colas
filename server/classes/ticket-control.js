const ConfigModel = require("../models/config");

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        ConfigModel.findOne().exec((err, configDb) => {
            if (err){
                console.log(err);
                return;
            }
            if (!configDb){
                this.reiniciarConteo();
            }

            if (configDb.hoy==this.hoy){

            } else{
                console.log(this.hoy);
                console.log(configDb.hoy)
                this.reiniciarConteo();
            }

        })
    }

    reiniciarConteo(){
        let configmodel=new ConfigModel({
            ultimo:this.ultimo,
            hoy:this.hoy
        });

        configmodel.save((err,configdb)=>{
            if (err){console.log("Error guardando en database")}
            else{console.log(configdb)}
        });
        console.log("Se ha inicializado el sistema");
    }

}

module.exports = {
    TicketControl
};
