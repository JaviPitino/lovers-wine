const { Schema, model } = require("mongoose");

const vinoSchema = new Schema({
    tipoVino: {
      type: [Tinto, Blanco, Rosado],
       required: true 
    },
  añada: {
type: [Jóvenes, Crianza, Reserva, Gran-Reserva],
          required: true 
    },
 año:{
      type: Number,
      required: true 
    },

    denOrigen: {
      type:String,
enum : [ Calatayud, Cava, Machuela, Monterrei, Navarra, Rioja, Rueda, Terra-Alta, Uclés, Utiel, Valdeorras],
required: true 
    },   
  
puntuación:{
      type: Number,
enum : [0, 1, 2, 3, 4, 5]
    },
maridaje: {
   type: String,
enum:  [Ensaladas, Fiambres-y-Patés, Carnes, Pescados-y-Mariscos, Pasta-y-Arroz, Postres, Quesos, Chocolate],
      required: true 
},
adminVinos: {
type: Schema.Types.ObjectId,
ref: "User"
}
});

const VinoModel = model("Vino", vinoSchema);

module.exports = VinoModel;
