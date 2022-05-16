const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
      type: String,
      unique: true, 
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true 
    },
    password:{
      type: String,
      unique: true,
      required: true 
    },
    password2:{
      type: String,
      unique: true,
      required: true 
    },
    admin: {
      type: Boolean,
      default: false
    },   
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
