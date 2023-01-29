const express=require('express')
const router=express.Router()
const {   getallitems,getallitemsstatic}=require('../controllers/products')
router.route('/').get(getallitems)
router.route('/static').get(getallitemsstatic)
module.exports=router;