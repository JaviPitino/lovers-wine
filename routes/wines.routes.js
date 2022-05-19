const router = require("express").Router();
const cloudinary = require("../middlewares/cloudinary.js")

const tipoVino = require("../utils/tipoVino.js")
const anada = require("../utils/anada.js")
const denOrigen = require("../utils/denOrigen.js")
const maridaje = require("../utils/maridaje.js")
const puntuacion = require("../utils/puntuacion.js")

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

const vinosCreados = require("../seeds/vinos.json")

const { isAdmin } = require("../middlewares/auth.middlewares.js")
const { isUser } = require("../middlewares/auth.middlewares.js");
const async = require("hbs/lib/async");


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


// ? CREAR VINOS
// GET (/wines/create) -> Crear más vinos
//! Crear un enlace para admin en el profile de admin
router.get("/create", isAdmin, (req, res, next) => {

  res.render("wines/wines-create.hbs", {
              tipoVino, 
              anada,
              denOrigen,
              maridaje,
              puntuacion
  })
})

//POST -> Crear vinos desde un formulario en la DB
router.post("/create", isAdmin, cloudinary.single("image"), async (req, res, next) => {

  const { _id } = req.session.user
  const { nombre, tipoVino, anada, ano, denOrigen, puntuacion, maridaje, adminVinos, vinoPicture } = req.body

  try {

    const createVino = await VinoModel.create({
      nombre,
      tipoVino,
      anada,
      ano,
      denOrigen,
      puntuacion,
      maridaje,
      adminVinos: _id,
      vinoPicture: req.file.path
    })
    
    // console.log(createVino)
    res.redirect(`/wines/${createVino._id}/details`)

  } catch (err) {next(err)}

})

// GET "/wines/list" -> Buscamos vinos creados por el usuario
router.get("/list", isAdmin, async (req, res, next) => {
  const { _id } = req.session.user
  try {
    const vinoCreadoUsuario = await VinoModel.find({adminVinos: _id})
    console.log(vinoCreadoUsuario)
  res.render("wines/wines-list.hbs", {
    vinoCreadoUsuario
  })
  } catch (err) {next(err)}

})

//? ACTUALIZAR VINOS
//GET "/wines/:id/upload" => Actualizar detalles del vino
router.get("/:id/upload", isAdmin, async (req, res, next) => {
  const { id } = req.params
  try{
    const vinoActua = await VinoModel.findById(id)
    res.render("wines/wines-edit.hbs", {
      vinoActua,
      tipoVino, 
      anada,
      denOrigen,
      puntuacion,
      maridaje  
    })

  } catch (err) {next(err)}

})

router.post("/:id/upload", isAdmin, cloudinary.single("image"), async (req, res, next) => {
  const { nombre, tipoVino, anada, ano, denOrigen, puntuacion, maridaje} = req.body
  const {id} = req.params
  console.log(req.body)

  let imageToAdd;
  if(req.file) {
    imageToAdd = req.file.path
  } else {
    console.log("¨NO IMAGE TO ADD")
  }

  try{
   await VinoModel.findByIdAndUpdate(id, {
    nombre,
    tipoVino,
    anada,
    ano,
    denOrigen,
    puntuacion,
    maridaje,
    vinoPicture: imageToAdd
  })
 
  res.redirect(`/wines/${id}/details`)

  }catch (err) {next(err)}
})


// GET ("/wines/:id/details") -> Mostrar vista 
router.get("/:id/details", async (req, res, next) => {
  const { id } = req.params
  const { _id } = req.session.user
  try {
    let userRole;
    let adminRole;
    const wineUser = await UserModel.findById(_id)
    if ( wineUser.role === "user") {
      userRole = true
    } else if ( wineUser.role === "admin" ){
      adminRole = true
    }
    const commentVino = await CommentModel.find().populate("vinoId")
    const comentario = await CommentModel.find().select("comment")
    const commentUserName = await CommentModel.find().populate("commentUser")
    const vinoDetalle = await VinoModel.findById(id)
    res.render("wines/details.hbs", {
      vinoDetalle,
      userRole,
      adminRole,
      commentUsers: commentUserName.username,
      comentario
      // commentVinoId: commentVino.id,
    })
    console.log(commentVino)
    
  } catch (err) {next(err)}
})
// POST ("/wines/:id/details") ->  
router.post("/:id/details/comments", async (req, res, next)=> {
  const { id } = req.params
  const { comment, rating, commentUser, vinoId } = req.body 
  const { _id } = req.session.user
  try{
    const nombreUser = await UserModel.findById(_id)

    const commentVino = await CommentModel.create({
      comment,
      rating,
      commentUser: nombreUser,
      vinoId: id
    })
    
    res.redirect(`/wines/${id}/details`)
    console.log(commentVino)
  }catch(err){next(err)}
})

//? BORRAR VINOS
router.post("/:id/delete", isAdmin, async (req, res, next) => {

  const {id} = req.params

  try {
    await VinoModel.findByIdAndDelete(id)

    res.redirect("/wines")

  }catch (err) {next(err)}
})


module.exports = router;