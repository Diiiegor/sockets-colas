const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let configSchema = new Schema({
    ultimo: {
        type: Number,
    },
    hoy: {
        type: Number,
    },
    tickets: {
        type: [
            {
                numero: Number,
                escritorio: Number
            }
        ]
    },
    ultimos4: {
        type: [
            {
                numero: Number,
                escritorio: Number
            }
        ]
    }
});

module.exports = mongoose.model('Config', configSchema, "config");
