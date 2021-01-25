const mongoose = require('mongoose');
const User = require("./usermodel");
const sendError = (err, res) => 
{
  response.status = 501;    
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

let response = 
{
  status: 200,
  data: [],
  message: null
};

exports.getData = function(req,res){
User.find({},function(err,data){
    if(!err){
        res.send(data);
    }
})  


}
exports.postData = function(req,res){
    console.log(req.body);
    console.log(req.file);
console.log(req.body);
let user = new User({
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
    address:req.body.address,
    Image :req.file.originalname 
})
user.save(function(err,result){
    if(err){
        console.log(err);
    }else{
        res.send({msg:'saved'});
    }
})

}
