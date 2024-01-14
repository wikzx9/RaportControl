const User = require('../models/userModel')

const handleLogout= async (req, res) =>{
    const { accesToken } = req.params
    const update = { refreshToken: '' }
  
    const user = await User.findOneAndUpdate(accesToken, update)
  
}

module.exports = { handleLogout }