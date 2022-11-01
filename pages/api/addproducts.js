import product from '../models/product';
import connectDb from '../middlewares/mongoose';

const handler = async(req,res)=>{
    if(req.method=='POST'){
        console.log(req.body)
        for(let i =0;i<req.body.length;i++){
        let p = new product({
            title:req.body[i].title,
            slug:req.body[i].slug,
            desc : req.body[i].desc,
            img:req.body[i].img,
            catagory:req.body[i].catagory,
            size : req.body[i].size,
            color:req.body[i].color,
            price: req.body[i].price,
            availability:req.body[i].availability,
        })
        await p.save();
    }
    res.status(200).json({success:"success"})
    
    }
   
    else{
        res.status(400).json({error:"this method is not allowed"})
    }
}
export default connectDb(handler);