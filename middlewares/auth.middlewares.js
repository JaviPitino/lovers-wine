module.exports = {
   isAdmin: (req, res, next) => {
        if ( req.session.user.role !== "admin" ) {
          res.redirect("/auth/login")
        } else {
          next() 
        }
    }
}