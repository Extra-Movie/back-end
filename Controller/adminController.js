// #region Requires
const UserModel = require("../Models/UserModel/UserModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require ('path');
//#endregion




const getAllUsersData = async (req,res) => {

    const allUsersData = await UserModel.find();
    res.status(200).json({message:"welcome admin",usersData : allUsersData});

}

const deleteNormalUser = async (req,res)=>{
    //receives Id from Body 
    let idToDelete = req.body.id ;
    console.log(idToDelete);

    //invalid passed ID 
    if(idToDelete.length!=24)
    {
        res.status(403).json({message:"welcome admin >> This is An invalid id"});
    }
    else 
    {
        //checks if it exists in db  and it matches with a normal user
        let foundUser = await UserModel.findOne({_id:idToDelete}) ;

        if(!foundUser) //not found
        {
            res.status(400).json({message:"welcome admin >> this Id is not Found"});
            return;
        }
        else 
        {
            //check admin status 
            let adminStatus = foundUser.isAdmin ;

            if(adminStatus) //can't delete an admin
            {
                res.status(400).json({message:"welcome admin >> You Can't delete an admin"});
                return;
            }
            else 
            {
                await UserModel.findOneAndDelete({_id:idToDelete}) ;
                res.status(200).json({message:"welcome admin >> Deleted Normal User Successfully"});
                return;
            }
        }

    }

}


module.exports = {getAllUsersData,deleteNormalUser}