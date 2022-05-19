const router = require("express").Router();

const bcryptjs = require("bcryptjs")

const UserModel = require("../models/User.model.js");
const VinoModel = require("../models/Vino.model.js");
const CommentModel = require("../models/Comment.model.js")

// GET ("/auth/signup") -> Renderiza el formulario de registro
router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

// POST ("/auth/signup") -> Recibir datos del usuario y crearla/registrarlo
router.post("/signup", async (req, res, next) => {

    const { username, email, password, password2 } = req.body

    // VALIDACIONES
    // 1. Validacion -> Si la info está completa
    if( username === "" || email === "" || password === "" || password2 === "") {
        res.render("auth/signup.hbs", {
            errorMensaje: "Debe rellenar todos los campos"
        })
        return;
    };

    if( password !== password2 ) {
        res.render("auth/signup.hbs", {
            errorMensaje: "La contraseña no coincide"
        })
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        if( !passwordRegex.test(password) ) {
            res.render("auth/signup.hbs", {
                errorMensaje: "La contraseña necesita entre 8 y 15 caracteres, al menos una letra maýuscula y minúscula, un caracter especial y ningún espacio en blanco"
            })
            return;
        }

    try {
        // Buscar un usuario que coincida con el usuario y email
        const foundUser = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        })
        if ( foundUser !== null ) {
            res.render("auth/signup.hbs", {
                errorMensaje: "El usuario ya está registrado"
            })
            return;
        }
        // Crear usuario en la base de datos y encriptar contraseña
        const salt = await bcryptjs.genSalt(12);
        const hashPassword = await bcryptjs.hash(password, salt);
        const hashPassword2 = await bcryptjs.hash(password2, salt);
        const createUser = await UserModel.create({
            username, email, password: hashPassword, password2: hashPassword2
        })
        req.session.user = createUser;
        req.app.locals.userIsActive = true;

        res.redirect("/profile") // ! Estamos redirigiendo al perfil de usuario

    } catch(err){next(err)}
})


// GET ("/auth/login") -> 
router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

// POST ("/auth/login") ->
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body

    // Validación de Backend
    if ( !email || !password ) {
        res.render("auth/login.hbs", {
            errorMensaje: "Debes rellenar todos los campos"
        })
        return;
    }
    try {
        // Validar que el usuario esté en la DB
        const foundUser = await UserModel.findOne({
            email
        })
        if ( foundUser === null ) {
            res.render("auth/login.hbs", {
                errorMensaje: "Lo sentimos, el usuario no está registrado"
            })
            return;
        }
        // Validar al usuario
        const passwordCheck = await bcryptjs.compare(password, foundUser.password)
        if( !passwordCheck ) {
            res.render("auth/login.hbs", {
                errorMensaje: "Contraseña errónea"
            })
            return;
        }
        req.session.user = foundUser;
        //req.app.locals.userIsActive = true;
        // req.app.locals.isAdmin = true;

        req.session.save(() => {
            res.redirect("/profile")
        })
        

    } catch(err){next(err)}

})

//POST ("/auth/logout") => Cerrar sesión de usuario
router.post("/logout", (req, res, next) => {

    req.session.destroy(() => {
        res.redirect("/");
    });
    //req.app.locals.userIsActive = false;
    // req.app.locals.isAdmin = false;



    
})

module.exports = router;