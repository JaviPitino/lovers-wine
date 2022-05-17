const router = require("express").Router();

const tipoVino = require("../utils/tipoVino.js")
const anada = require("../utils/anada.js")
const denOrigen = require("../utils/denOrigen.js")
const maridaje = require("../utils/maridaje.js")
const score = require("../utils/puntuacion.js")

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
  } catch (err) {
    next(err)
  }
})



// GET ("/wines/blanco") -> Mostrar vista con los vinos blancos
router.get("/blanco", async (req, res, next) => {
  try {
    const vinoBlanco = await VinoModel.find({
      tipoVino: "Blanco"
    })
    res.render("wines/blanco.hbs", {
      vinoBlanco
    })
  } catch (err) {
    next(err)
  }
})

// GET ("/wines/rosado") -> Mostrar vista con los vinos rosados
router.get("/rosado", async (req, res, next) => {
  try {
    const vinoRosado = await VinoModel.find({
      tipoVino: "Rosado"
    })
    res.render("wines/rosado.hbs", {
      vinoRosado
    })
  } catch (err) {
    next(err)
  }
})


//? CREAR VINOS

// GET (/wines/create) -> Crear más vinos
//! Crear un enlace para admin en el profile de admin
router.get("/create",  (req, res, next) => {

  res.render("wines/wines-create.hbs", {
              tipoVino, 
              anada,
              denOrigen,
              maridaje,
              score
  })
})


//POST -> Crear vinos desde un formulario en la BD
router.post("/create",  async (req, res, next) => {

  const { nombre, tipoVino, anada, ano, denOrigen, puntuacion, maridaje, vinoPicture } = req.body

  try {
    const createVino = await VinoModel.create({
      nombre,
      tipoVino,
      anada,
      ano,
      denOrigen,
      puntuacion,
      maridaje,
      vinoPicture
    })
    console.log(createVino)
    res.redirect(`/wines/${createVino._id}/details`)

  } catch (err) {next(err)}

})

// GET ("/wines/:id/details") -> Mostrar vista 
router.get("/:id/details", async (req, res, next) => {
  const { id } = req.params
  try {
  //   if (wineUser.role === "admin") {
  //       adminRole = true
  // }
    const vinoDetalle = await VinoModel.findById(id)
    res.render("wines/details.hbs", {
      vinoDetalle
    })
  } catch (err) {next(err)}
})



//? ACTUALIZAR VINOS

//GET "/wines/:id/upload" => Actualizar detalles del vino

router.get("/:id/upload", async (req, res, next) => {
  const { id } = req.params
try{
  const vinoActualizado = await VinoModel.findById(id)
  res.render("wines/wines-edit.hbs", {
    vinoActualizado
})

} catch (err) {next(err)}

})

router.post("/:id/upload", async (req, res, next) => {
  const { nombre, tipoVino, anada, ano, denOrigen, puntuacion, maridaje, vinoPicture } = req.body
  const {id} = req.params

  try{
  const vinoActua = await VinoModel.findByIdAndUpdate(id, {
    nombre,
    tipoVino,
    anada,
    ano,
    denOrigen,
    puntuacion,
    maridaje,
    vinoPicture
  })

  res.redirect(`/wines/${vinoActua._id}/details`)

  }catch (err) {next(err)}
})


//? BORRAR VINOS

router.post("/:id/delete", async (req, res, next) => {

  const {id} = req.params
  
  try {
    await VinoModel.findByIdAndDelete(id)

    res.redirect("/wines")

  }catch (err) {next(err)}
})



module.exports = router;