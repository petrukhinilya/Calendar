const jwt = require('jsonwebtoken');

module.exports = {
    tokenVerify: (req, res, next) => {
        const { token:bodyToken } = req.body;
        const { token:queryToken } = req.query;
        const token = bodyToken || queryToken;
        
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
    }
}
