const router = require("express").Router();

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

// GET ("/admin") -> Mostrar vista del perfil de admin con la lista de vinos

// POST ("/admin") -> 


module.exports = router;