const router = require("express").Router();

const bcryptjs = require("bcryptjs")
const cloudinary = require("../middlewares/cloudinary.js")

const { isAdmin } = require("../middlewares/auth.middlewares.js")
const { isUser } = require("../middlewares/auth.middlewares.js")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

// GET ("/profile") ->
router.get("/", async (req, res, next) => {
    const { _id } = req.session.user
    try {
        let adminRole;
        let userRole;
        const wineUser = await UserModel.findById(_id)
        // console.log(wineUser)
        if (wineUser.role === "admin") {
            adminRole = true
        } else {
            userRole = true
        }
        res.render("user/user.hbs", {
            wineUser,
            adminRole,
            userRole
        })
    } catch(err){next(err)}
})

router.post("/", cloudinary.single("image"), async (req, res, next) => {
    const { _id } = req.session.user
    try {
        await UserModel.findByIdAndUpdate(_id, {
            image: req.file.path
        })
        res.redirect("/profile");

    } catch(err){next(err)}
})

// GET ("/profile/wish-list") -> Nos va a renderizar la lista de vinos favoritos
router.get("/wish-list", async (req, res, next) => {
    const { _id } = req.session.user
    
    try {
        const userObject = await UserModel.findById(_id).populate("wishList")
        res.render("user/wish-list.hbs", {
            listVino: userObject.wishList
        })

    } catch(err){next(err)}

})

// POST ("/profile/wish-list") -> Añade elemento a la lista de favoritos
router.post("/wish-list/:favId", async (req, res, next) => {
    const { _id } = req.session.user
    const { favId } = req.params
    try {
        const listVino = await UserModel.findByIdAndUpdate( _id, { 
            $addToSet: {wishList: favId}
        })
        res.redirect("/profile/wish-list")

    } catch(err){next(err)}
})

//? BORRAR DE LA LISTA DE FAVORITOS
router.post("/wish-list/:id/delete", async (req, res, next) => {
    const { id } = req.params
    try {
        await VinoModel.findByIdAndDelete(id)
        res.redirect("/profile/wish-list")

    } catch(err){next(err)}
})

module.exports = router;