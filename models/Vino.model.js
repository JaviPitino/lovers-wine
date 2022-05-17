const {Schema, model} = require("mongoose");

const tipoVino = require("../utils/tipoVino.js")
const anada = require("../utils/anada.js")
const denOrigen = require("../utils/denOrigen.js")
const maridaje = require("../utils/maridaje.js")
const puntuacion= require("../utils/puntuacion.js")

const vinoSchema = new Schema({
    nombre:{
        type: String,
        // required: true
    },
    tipoVino: [{
        type: String,
        enum: tipoVino,
        // required: true
    }],
    anada: [{
        type: String,
        enum: anada
        // required: true
    }],
    ano: {
        type: Number,
        // required: true
    },

    denOrigen: [{
        type: String,
        enum: denOrigen
        // required: true
    }],

    puntuacion: [{
        type: String,
        enum: puntuacion
    }],
    maridaje: [{
        type: String,
        enum: maridaje
        // required: true
    }],
    adminVinos: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    vinoPicture: {
        type: String
    }
});

const VinoModel = model("Vino", vinoSchema);

module.exports = VinoModel;