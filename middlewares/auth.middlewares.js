module.exports = {
   isAdmin: (req, res, next) => {
      if ( req.session.user.role !== "admin" ) {
        res.redirect("/auth/login")
      } else {
        next() 
      }
   },

  isUser: (req, res, next) =>{
      if(req.session.user.role !== "user"){
          res.redirect("/auth/login")
          return;
      } else {
          next() 
      }
  }
}