const {Schema, model} = require("mongoose");

const vinoSchema = new Schema({
    nombre:{
        type: String,
        // required: true
    },
    tipoVino: {
        type: String,
        enum: ["Tinto", "Blanco", "Rosado"],
        // required: true
    },
    anada: {
        type: String,
        enum: ["Joven", "Crianza", "Reserva", "Gran Reserva"],
        // required: true
    },
    ano: {
        type: Number,
        // required: true
    },

    denOrigen: {
        type: String,
        enum: ["Calatayud", "Cava", "Machuela", "Ribera del Duero", "Navarra", "Rioja", "Rueda", "Terra Alta", "Uclés", "Utiel", "Rías Baixas"],
        // required: true
    },

    puntuacion: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
    maridaje: [{
        type: String,
        enum: ["Ensaladas", "Fiambres y Patés", "Carnes", "Pescados y Mariscos", "Pasta y Arroz", "Postres", "Quesos", "Chocolate"]
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