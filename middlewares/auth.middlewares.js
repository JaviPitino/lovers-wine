module.exports = {
   isAdmin: (req, res, next) => {
      if ( req.session.user.role === "admin" ) {
        next() 
      } else {
        res.redirect("/auth/login")
      }
   }

  // isUser: (req, res, next) =>{
  //     if(req.session.user.role !== "user"){
  //         res.redirect("/auth/login")
  //         return;
  //     } else {
  //         next() 
  //     }
  // }
}