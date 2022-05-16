const router = require("express").Router();

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

const vinosCreados = require("../seeds/vinos.json")

const { isAdmin } = require("../middlewares/auth.middlewares.js")

// GET ("/wines") -> Mostrar vista con las categorias de vinos
router.get("/", (req, res, next) => {

    res.render("wines/wines.hbs")

})

// GET ("/wines/tinto") -> Mostrar vista con los vinos tintos
router.get("/tinto", async (req, res, next) => {

  try {
    const vinoTinto = await VinoModel.find({tipoVino: "Tinto"})

    res.render("wines/tinto.hbs", {
      vinoTinto
    })
  }catch(err){next(err)}
})



// GET ("/wines/blanco") -> Mostrar vista con los vinos blancos
router.get("/blanco", async (req, res, next) => {
  try {
    const vinoBlanco = await VinoModel.find({tipoVino: "Blanco"})
    res.render("wines/blanco.hbs", {
      vinoBlanco
    })
  }catch(err){next(err)}
})

// GET ("/wines/rosado") -> Mostrar vista con los vinos rosados
router.get("/rosado", async (req, res, next) => {
  try {
    const vinoRosado = await VinoModel.find({tipoVino: "Rosado"})
    res.render("wines/rosado.hbs", {
      vinoRosado
    })
  }catch(err){next(err)}
})

// GET ("/wines/:id/details") -> Mostrar vista con los vinos rosados
router.get("/:id/details", async (req, res, next) => {
    const { id } = req.params
    try {
        const vinoDetalle = await VinoModel.findById( id )
        res.render("wines/details.hbs", {
            vinoDetalle
        })
    } catch(err){next(err)}
})






module.exports = router;