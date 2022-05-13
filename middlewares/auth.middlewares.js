module.exports = {
    isAdmin: (req, res, next) => {
        if (!req.session.user.admin ) {
          //! res.redirect("") => Falta saber el nombre de nuestra página de loggin
        } else {
          next() 
        }
      },

      isUser: (req, res, next) =>{
        if(!req.session.user){
            //! res.redirect("") => Falta saber el nombre de nuestra página de loggin
            return;
        } else {
            next() 
        }
    }
}