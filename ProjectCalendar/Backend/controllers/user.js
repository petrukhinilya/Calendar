const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.test = function (req, res) {

  res.send('Greetings from the Test controller!');
};

const createToken = (id) => {
  return jwt.sign({ id }, 'secretKey', { expiresIn: '24h' });

}


module.exports = {
  create: function (req, res, next) {
    console.log("Request", req.body)
    userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) {
        console.log("error", err)
        next(err);
      }
      else {
        const token = createToken(result._id)
        res.status(200).send({ status: "success", message: "User added successfully!!!", data: { token } });
      }
    });
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (!userInfo) {
          res.status(401).send({ status: 'error', message: "user not found" })
        } else {

          const bcryptAddit = bcrypt.compareSync(req.body.password, userInfo.password)

          if (bcryptAddit) {
            const token = createToken(userInfo._id)
            res.status(200).send({ status: "success", message: "user found!!!", data: { user: userInfo, token } });
            console.log("responseBody", userInfo)

          } else {
            res.json({ status: "error", message: "Invalid password!!!", data: null });
          }
        }
      }
    });
  },
  verify_token: function (req, res, next) {
    const {token} = req.body
    console.log('Token',token)
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        console.log('xxx',err)
      res.status(401).send({ auth: false, message: "Failed to auth" })
      } else {
        console.log('Accept')
        req.body.id = decoded.id
        res.status(200).send({ status: "success", message: "TOKEN found!!!", auth : true})
        next()
      }
    })
  }
}



// const verifyJWT  = (req , res , next) => {
//   const token = createToken(userToken._id)
//   if(!token){
//     res.status(401).send({ status: "error", message: "Invalid password!!!", data: null })
//   }else{
//     jwt.verify(token,'secretKey',(err,decoded)=>{
//       if(err){
//         res.json({auth:false,message:"Failed to auth"})
//       }else{
//         req.userToken = decoded.id
//         next()
//       }
//     })
//   }
// }
