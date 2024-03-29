const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res) =>{

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec;
    if(!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accesToken = jwt.sign(
                {
                    "UserInfo":{
                        "username" : decoded.email,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn:'2h'
                }
            )
            res.json({roles,accessToken})
        }
    )
}

module.exports = { handleRefreshToken }