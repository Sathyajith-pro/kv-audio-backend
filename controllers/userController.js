import User from "../models/user.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";

export function registerUser (req,res){

    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10)
    
    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({message : "User Registered successfully"})
    }).catch(()=>{
        res.status(500).json({message : "User registered failed"})
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then((user)=>{

        if(user== null) {
            res.status(404).json({error: "User not found"})
        }else{
            const isPasswordCorrect = bcrypt.compareSync
            (data.password,user.password);

            if(isPasswordCorrect){
                const token = JsonWebToken.sign({
                    firstName : user.firstName,
                    lastName  : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture :user.profilePicture,
                    phone : user.phone,
                },"kv-secret-89!")
                res.json({message : "Login successful",token : token, user:user});


            }else{
                res.status(404).json({error: "Login failed"});
            }
        }
    })

}


export function isItAdmin(req){

    let isAdmin=false;
    if(req.user != null && req.user.role == "admin"){
        isAdmin = true;
    }
    return isAdmin;
}

export function isItCustomer(req){

    let isCustomer=false;
    if(req.user != null && req.user.role == "customer"){
        isCustomer = true;
    }
    return isCustomer;
}