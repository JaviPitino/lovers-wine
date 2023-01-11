# Wine.Routes}

## Description

Wine.Routes is a platform for wine lovers to get to know different varieties of wine and share their opinions about them.

## User stories
As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
login-signup - As a user, I want to see a welcome page that gives me the option of logging in as an existing user, or registering with a new account.
add-signup - As a user, I want to register with my full details so that I can log in securely.
home page : As a user, I want to see a preview of the wine categories and be able to search by wine type or go to my profile from the home page or be able to log out.  
search wines - As a user, I want to see the details of the search for a particular wine with all its characteristics and a photo of the wine. Also, go back to the previous page if I wish to view another wine. 
user interactions - As a user, I want to be able to add a wine to my favourites list and give my opinion on the wine. Also, to go back to the previous page if I want to see another wine. 
user profile - As a user, I want to be able to see my name, edit my profile picture and see my list of favourite wines.  Also, I want to be able to delete a wine from my favourites list.

## Admin stories
login-signup - As an administrator, I want to see a welcome page that gives me the option to log in as an administrator.
add-signup - As an administrator, I want to register with my full details so that I can log in securely.
home page : As an administrator, I want to see a preview of the wine categories and be able to search by wine type or go to my profile from the home page or be able to log out.  
create wines - As an administrator, I want to be able to create a wine with all its characteristics and add a photo.
edit wines - As an administrator I want to be able to edit a wine with all its characteristics and update a photo.
delete wines - As an administrator I want to be able to delete a wine. 
user profile - As an administrator, I want to be able to see my name, edit my profile picture and see my list of wines created by my user. 


# API routes (back-end)
GET /
renders index.hbs (Home)

GET /
renders about.hbs (Conócenos)

AUTH

GET /auth/signup

redirects to / if user logged in
renders auth/signup.hbs

POST /auth/signup

redirects to / if user logged in
username
email
password
password2

GET /auth/login

redirects to / if user logged in
renders auth/login.hbs

POST /auth/login

redirects to / if user logged to profile

POST /auth/logout

redirects the user to home.

PROFILE

GET /profile

redirects to / if user logged in
renders user/user.hbs

POST /profile (to edit profile)
image

redirects to /profile

GET /profile/wish-list

renders: user/wish-list.hbs

POST /profile/wish-list 

redirect when user add a favourite wine

POST /profile/wish-list/:id/delete"

redirect when user delete a favourite wine

WINES

GET /wines
renders wines/wines.hbs

GET /wines/tinto

renders wines/tinto.hbs

GET /wines/blanco

renders wines/blanco.hbs

GET /wines/rosado

renders wines/rosado.hbs

GET /wines/create

renders wines/wines-create.hbs

POST /wines/create

redirect wines/wine.id/details

GET wines/list

renders wines/wines-list.hbs

GET /wines/:id/upload

renders wines/wines-edit.hbs

POST wines/:id/upload

redirect wines/wine.id/details

GET /wines/:id/details

renders wines/details.hbs

POST /wines/:id/details

redirect wines/wine.id/details

POST /wines/:id/delete"

redirect when user delete a favourite wine


## Models

commentSchema = new Schema({comment:{type: String,},rating: {type: Number, enum: [0, 1, 2, 3, 4, 5]},commentUser: {type: Schema.Types.ObjectId,ref: "User"},vinoId: {type: Schema.Types.ObjectId,ref: "Vino"}});

userSchema = new Schema({username: {type: String,    unique: true,required: true},email: {type: String,     unique: true,required: true },password:{type: String,     unique: true,required: true },password2:{type: String,   unique: true,required: true},role: {type: String,     enum: ["user", "admin"], default: "user"},image: type: String},wishList: [{type: Schema.Types.ObjectId,ref: "Vino"}]},{timestamps: true,});
const vinoSchema = new Schema({nombre:{type: String,}, tipoVino: [{type: String,enum: tipoVino,}],anada: [{type: String,enum: anada}],ano: {type: Number,},denOrigen: [{type: String,enum: denOrigen}],puntuacion: [{type: String, enum: puntuacion}],maridaje: [{type: String,enum: maridaje}], vinoPicture: {type: String},adminVinos: {type: Schema.Types.ObjectId, ref: "User"}});

## Backlog

Include a new winery model and to be able to associate wine with a winery.
The wineries should be able to display the events that take place in order to inform wine lovers of the events that take place.

Users can edit and delete their comments.

Expand your profile to include personal details and a section to talk about yourself.

A search engine and filters to find a specific wine.

## Git
https://github.com/JaviPitino/lovers-wine/tree/3372f050a6766e52e584b8d07b8a812f1e65e155

## Heroku

https://wine-routes.herokuapp.com/about


