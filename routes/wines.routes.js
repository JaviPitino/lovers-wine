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
router.get("/tinto", (req, res, next) => {

    let newArr = []
  vinosCreados.forEach((eachWine) => {
    if (eachWine.tipoVino === "Tinto") {
      newArr.push(eachWine)
    }
  })

  res.render("wines/tinto.hbs", {
    vinoTinto: newArr
  })

})

// GET ("/wines/blanco") -> Mostrar vista con los vinos blancos
router.get("/blanco", (req, res, next) => {

  let newArr = []
  vinosCreados.forEach((eachWine) => {
    if (eachWine.tipoVino === "Blanco") {
      newArr.push(eachWine)
    }
  })

  res.render("wines/blanco.hbs", {
    vinoBlanco: newArr
  })


})

// GET ("/wines/rosado") -> Mostrar vista con los vinos rosados
router.get("/rosado", async (req, res, next) => {

    let newArr = []
    vinosCreados.forEach((eachWine) => {
      if (eachWine.tipoVino === "Rosado") {
        newArr.push(eachWine)
      }
    })
  
    res.render("wines/rosado.hbs", {
      vinoRosado: newArr
    })

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


// POST ("/admin") -> 



module.exports = router;