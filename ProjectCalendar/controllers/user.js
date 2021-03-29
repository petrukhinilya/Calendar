const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({ id }, 'secretKey', { expiresIn: '24h' });
}

module.exports = {
  create: function (req, res, next) {



    userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) {
        console.log("error", err)
        res.status(401).send({status: err.message })
        next(err);
      }
      else {
        console.log('result', result)
        const token = createToken(result._id)
        res.status(200).send({ status: "success", message: "User added successfully!!!", data: { token }, auth: true });
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
            console.log("responseBody", userInfo)
            console.log(token)
            res.status(200).send({ status: "success", message: "user found!!!", data: { user: userInfo, token }, auth: true });
          } else {
            res.json({ status: "error", message: "Invalid password!!!", data: null, auth: false });
          }
        }
      }
    });
  },
  verify_token: function (req, res, next) {
    const { token } = req.body
    console.log('Token', token)

    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        console.log('xxx', err)
        res.status(401).send({ auth: false, message: "Failed to auth", auth: false })
      }
      req.body.id = decoded.id
      console.log(decoded)
      res.status(200).send({ status: "success", message: "TOKEN found!!!", auth: true })
      next()

    })
  },
  find_user: function (req, res, next) {
    userModel.find({ email: req.body.email }, function (err, userInfo) {

      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(userInfo)
      res.status(200).send({status: 'success', message: "This email has already used", exist: true})
    })

  }
}


