// #region Requires
const UserModel = require('../Models/UserModel/UserModel'); 
const bcrypt = require('bcrypt');
//#endregion

//#region global vars
const saltRounds = 10;
//#endregion


const registerNewUser = async(req, res) => {
    //get data from body
    let passedUser = req.body; //{name,email,password}

    //check validation first if data valid then proceed >> ajv or ...
    //valid

    //check if passed email is already exists in DB 

    let userFound = await UserModel.findOne({email : passedUser.email.toLowerCase()}) ;


    if(userFound)
    {
        res.status(200).json({message:"Already Exists >> Please Login"});
        return ;
    }
    //not exists >> add it to DB Collection 
    else 
    {

        //hash password first 
        const salt = await bcrypt.genSalt(saltRounds) ;
        const hashPassword = await bcrypt.hash(passedUser.password, salt);
        passedUser.password = hashPassword ;

        //default add it as a normal user

        //if no passed value >> assign it as a normal user
        passedUser.isAdmin = passedUser.isAdmin ??false ;

        //add date of join
        passedUser.joinDate = new Date() ;

        passedUser.email = passedUser.email.toLowerCase() ;

        let newUser = new UserModel(passedUser); 
        

        

        //save in DB
        await newUser.save();
        allUsers = await UserModel.find() ;
        return res.status(201).json({message:"Added Successfully" , data : newUser}) ;
    }

    //not valid user data >> don't send request 
        // res.status(400).json({message:"Wrong Data Input Format"}) ;

};

//#region all methods
module.exports = {registerNewUser};
//#endregion
