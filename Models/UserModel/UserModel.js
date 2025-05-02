const mongoose = require('mongoose');


//adminType true means admin - false normal user
const RegisterUserSchema = new mongoose.Schema(
    {
      name: {type:String, required:true , minLength : 3 , maxLength : 30 , match : /^[a-zA-Z-_.]{3,}$/},
      email: {type:String, required:true , match:/^[a-zA-Z][a-zA-Z0-9_.]{3,}@[a-zA-Z]{3,}.[a-zA-Z]{3,}$/ },
      password: {type:String, required:true , minLength:8 , match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
      isAdmin : {type:Boolean, required:true , default : false } ,  //means it's a normal user
      joinDate : {type:Date, required:true } , 
      //paid movies  >> array of obj IDs of movie collection IDs 
      //favourite movies >> array of obj IDs of movie collection IDs 

    },
    { collection: "Users" }
  );
  
  const RegisteredUserModel = mongoose.model("Users", RegisterUserSchema);
  
  module.exports = RegisteredUserModel;