const router = require("express").Router();

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

const cloudinary = require("../middlewares/cloudinary.js")

// GET ("/profile") ->
router.get("/"), async (req, res, next) => {
    const { _id } = req.session.user
    try {

        let adminRole;
        const wineUser = await UserModel.findById(_id)
        console.log(wineUser)
        if (wineUser.role === "admin") {
            adminRole = true

        }
        res.render("user/user.hbs", {
            wineUser,
            adminRole
        })

        
    } catch(err){next(err)}
    
}

//! CLOUDINARY

// router.get("/", cloudinary.single("image"), async (req, res, next) => {
//     const { _id } = req.session.user
//     try {
//         const imagePerfil = await UserModel.findByIdAndUpdate(_id, {
//             imagePerfil: req.file.path
//         })
//         res.redirect("/profile");
        

//         let adminRole;
//         const wineUser = await UserModel.findById(_id)
//         console.log(wineUser)
//         if (wineUser.role === "admin") {
//             adminRole = true

//         }
//         res.render("user/user.hbs", {
//             wineUser,
//             adminRole
//         })

        
//     } catch(err){next(err)}

module.exports = router;