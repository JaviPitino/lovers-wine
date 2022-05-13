require("../db")
const mongoose = require("mongoose")
let vinoArr = require("./vinos.json")

const VinoModel = require("../models/Vino.model.js")

const addVino = async () => {

    try {
        await VinoModel.insertMany(vinoArr
        //     {
        //     nombre, tipoVino, añada, año, denOrigen, puntuacion, maridaje, vinoPicture
        // }
        )
        console.log("todo bien, los vinos se van agregando")
    }
    catch(err){
        console.log( err )
    }
}

addVino();

