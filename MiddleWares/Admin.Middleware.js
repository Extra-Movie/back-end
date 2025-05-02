// #region Requires 
const jwt = require("jsonwebtoken");
const path = require ('path');
const fs = require("fs");
//#endregion

// #region Private Key
const privateKey = fs.readFileSync(
    path.join( __dirname,"/../Utils/Secret.key.txt"),
  "utf8"
);
//#endregion


const checkIfItIsAdmin= async (req,res,next)=>{

    //receicve cookie token 
    let dataJWT =  req.cookies["x-auth-token"] ;

    //decode with secret key 
    let decodedData =  jwt.verify(dataJWT, privateKey);
    console.log(decodedData);

    //check if it's an admin 
    let adminCheck = decodedData.isAdmin ;

    //not an admin
    if(!adminCheck)
    {
        res.status(400).json({message:"Not An Admin"});
    }
    //an admin 
    else 
    {
        next() ;
    }

}


module.exports = {
    checkIfItIsAdmin
}