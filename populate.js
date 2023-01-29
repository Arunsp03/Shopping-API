 require('dotenv').config();
 const mongoose=require('mongoose');
 const product=require('./models/product')
 const listofitems=require('./products.json')
 const connectDB=require('./db/connect');
 const start=async ()=>{
    try{
     await   connectDB(process.env.MONGO_URI);
        console.log("success");
       await product.deleteMany();
        await product.create(listofitems);
        process.exit(0);
    } 
    catch(e){
        console.log(e);
        process.exit(1);
    }
 }
 start();