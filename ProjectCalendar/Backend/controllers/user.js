const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.test = function (req, res) {

    res.send('Greetings from the Test controller!');
};

// exports.login = async (req,res) => {
//     try {
//         const {email , password} = req.body
//         const user = await Users.findOne({email})
//         if(!user){
//             return res.status(404).json({message:'User not found'})
//         }
//         const isPassValid = bcrypt.compareSync(password,user.password)
//         if(!isPassValid){
//             return res.status(400).json({message:'Password not found'})
//         }
//         const token = jwt.sign({id: user.id} , "secretKey"),
//         return res.json({
//             token,
//             user: {
//                 id:user.id,
//                 email:user.email
//             }
//         })
//     } catch(e){
//         console.log(e)
//         res.send({message:'Server error'})
//     }
// }


module.exports = {
    create: function(req, res, next) {
     
     userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
         if (err) 
          next(err);
         else
          res.json({status: "success", message: "User added successfully!!!", data: null});
         
       });
    },
   authenticate: function(req, res, next) {
     userModel.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
         next(err);
        } else {
        console.log("requestBody",req.body)
        console.log("responseBody",userInfo)
        const bcryptAddit = bcrypt.compareSync(req.body.password, userInfo.password)
        console.log(bcryptAddit)

   if(bcrypt.compareSync(req.body.password, userInfo.password)) {
   const token = jwt.sign({id: userInfo._id}, 'secretKey', { expiresIn: '1h' });
   res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
   console.log("responseBody",userInfo)
   
   }else{
   res.json({status:"error", message: "Invalid email/password!!!", data:null});
   }
        }
       });
    },
   }

