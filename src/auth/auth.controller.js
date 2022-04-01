const jwt = require('jsonwebtoken');

const AuthController = {
    sendToken(req, res) {
        const secret = process.env.JWT_SECRET;
        const id = req.user._id;
        const date = new Date();
        const payload = {
            id,
            date
        }

        const token = jwt.sign(payload, secret, {expiresIn: '86400s'});

        res.json({id, token});
    }



}

module.exports = AuthController;
