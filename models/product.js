const mongoose=require('mongoose');
const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'not suppoerted',
        }
       // enum:['ikea','liddy','caressa','marcos'],
    }
})
module.exports=mongoose.model('Product',productschema);