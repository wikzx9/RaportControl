const User =  require('../models/userModel')
const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) => {
    const {user, pwd} =req.body

    if(!user || !pwd) return res.status(400).json({'wiadomosc' : 'Hasło i nazwa użytkownika jest wymagane'})

    const duplikat = await User.findOne({email: user}).exec()
    if(duplikat) return res.sendStatus(409)

    try{
        const hashedPwd = await bcrypt.hash(pwd,10);

        const result = await User.create({
            "email" : user,
            "password" : hashedPwd
        })
        console.log(result)

        res.status(201).json({'succes': `Nowy użytkownik ${user} został stworzony.`})
    } catch(err) {
        res.status(500).json({'wiadomosc' : err.message})
    }
}
module.exports = { handleNewUser };