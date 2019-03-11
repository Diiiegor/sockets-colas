const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let configSchema = new Schema({
    ultimo: {
        type: Number,
    },
    hoy: {
        type: Number,
    }
});

module.exports = mongoose.model('Config', configSchema, "config");
