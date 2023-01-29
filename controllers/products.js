const Product=require('../models/product')
const getallitemsstatic=async (req,res)=>{
    res.status(200).json({success:true,msg:"testing static"})
}
const getallitems=async (req,res)=>{
    const{sort,featured,company,name,fields,numericfilters}=req.query;
    const queryobj={
    }
    if(featured){
        queryobj.featured=featured===true?true:false;
        
    }
    if(company){
        queryobj.company=company;
    }
    if(name){
        queryobj.name={$regex:name,$options:'i'};
    }
    let result=Product.find(queryobj);
    if(sort){
        const sortlist=sort.split(',').join(' ');
        result=result.sort(sortlist)
    }
    else{
        result=result.sort('createdAt')
    }
    if(fields){
        const fieldslist=fields.split(',').join(' ');
        result=result.select(fieldslist)
    }
    if(numericfilters){
       const operatorMap={
        '>':'$gt',
        '<':'$lt',
        '=':'$eq',
        '>=':'$gte',
        '<=':'$lte',
       }
       const regEx=/\b(<|>|>=|=|<=)\b/g
       let filters=numericfilters.replace(regEx,(match)=>
        `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [fields, operator, value] = item.split('-');
      if (options.includes(fields)) {
        queryobj[fields] = { [operator]: Number(value) };
      }
    });
    }
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10;
    const skip=(page-1)*limit;
    const prod=await result.skip(skip).limit(limit);
    res.status(200).json({success:true,prod}); 
    
}
module.exports={
    getallitems,getallitemsstatic
}