const jwt = require('jsonwebtoken');

module.exports = {
    tokenVerify: (req, res, next) => {
        const { token } = req.body

        if (token) {
            jwt.verify(token, 'secretKey', (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.status(401).send({ auth: false, message: "Failed to auth" })
                } else {
                    req.body.id = decoded.id
                    next()
                }
            })
        } else {
            res.status(403).send({ success: false, message: "No Token Provided." })
        }
    },

    queryVerify: (req, res, next) => {
        const { token } = req.query

        if (token) {
            jwt.verify(token, 'secretKey', (err, decoded) => {
                if (err) {
                    console.log('xxx', err)
                    res.status(401).send({ auth: false, message: "Failed to auth" })
                } else {
                    next()
                }
            })
        } else {
            res.status(403).send({ success: false, message: "No Token Provided." })
        }

    }
}
