const router = require("express").Router();

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

// GET ("/profile") ->
router.get("/", async (req, res, next) => {
    const { _id } = req.session.user
    try {
        const wineUser = await UserModel.findById(_id)

        res.render("user/user.hbs", {
            wineUser
        })
    } catch(err){next(err)}
    
})

module.exports = router;