const User = require('../models/userModel')

const showAllUsers = async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(204).json({'message' : 'Nie znaleziono użytkownika '})
    res.json(users)
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(() => res.status(200).json({wiadomosc: "Usunięcie użytkownika o numerze " + id}))
    .catch(err=> res.status(500).json(err))
}

module.exports = {
    showAllUsers,
    deleteUser
}