require('dotenv').config();
require('express-async-errors')
const express=require('express');
const app=express();
const connectDB=require('./db/connect')
const Tasks=require('./routes/products')
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('<h1>HOME</h1>');
})
app.use('/api/v1/products',Tasks);


const start= async ()=>{
try{
   await connectDB(process.env.MONGO_URI);
    console.log("db connected");
    app.listen(5500,(req,res)=>{
        console.log("Server is listening");
    })
}
catch(e){
    console.log(e);
}
}
start();