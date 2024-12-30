import Product from "../models/product.js";

export function addProduct(req,res){

    console.log(req.user)
    if(req.user == null){

        res.status(401).json({
            message : "please login try again"
        })
        return  //return ekak dala methanin pahala tika run wena eka nawaththanawa
    }
    if(req.user.role != "admin"){
        res.status(401).json({
            message : "You are not authorized perform this action"
        })
        return
    }

    const data = req.body;

    const newProduct = new Product(data);

    newProduct.save().then(()=>{
        res.json({message : "Product add successfully"});

    }).catch((error)=>{
        res.status(500).json({message : "Product addition failed"})
    });
}