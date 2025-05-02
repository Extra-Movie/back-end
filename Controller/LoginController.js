// #region Requires
const UserModel = require("../Models/UserModel/UserModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require ('path');
//#endregion

// #region Private Key
const privateKey = fs.readFileSync(
    path.join( __dirname,"/../Utils/Secret.key.txt"),
  "utf8"
);
//#endregion

const loginUser = async (req, res) => {
  let userLoginData = req.body; //email - password

  //validation fisrt on received body >> ajv ...

  //checks first if email exists in DB

  let foundUser = await UserModel.findOne({ email: userLoginData.email });

  //Not Found >> json--- invalid email or password
  if (!foundUser) {
    res.status(400).json({ message: "Invalid Email Or Password" });
  } //if Found Then Checks password matching
  else {
    let comparePasswordMatching = await bcrypt.compare(
      userLoginData.password,
      foundUser.password
    );

    if (comparePasswordMatching) {
      //matching password >> logged in successfully
      //data token
      let userPassedData = {
        name : foundUser.name ,
        email : foundUser.email , 
        id : foundUser.id ,
        isAdmin : foundUser.isAdmin
      };
      let userDataToken = await jwt.sign(userPassedData,privateKey);

      //send Cookie will expire in a year
      res.cookie("x-auth-token",userDataToken,
        {httpOnly: true,
        secure: false,          
        maxAge: 365 * 24 * 60 * 60 * 1000 });

      res.status(200).json({ message: "Logged In Successfully", userData: { foundUser } });

    } //no match >> json--- invalid email or password
    else {
      res.status(400).json({ message: "Invalid Email Or Password" });
    }
  }
};

//#region all methods
module.exports = { loginUser };
//#endregion
