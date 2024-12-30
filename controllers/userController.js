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
                    firstname : user.firstName,
                    lastname  : user.lastName,
                    eamil : user.email,
                    role : user.role
                },"kv-secret-89!")
                res.json({message : "Login successful",token : token});


            }else{
                res.status(404).json({error: "Login failed"});
            }
        }
    })

}