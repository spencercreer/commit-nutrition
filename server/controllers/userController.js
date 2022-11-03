const { User } = require('../models')

const userController = {
    getOneUser(req, res) {
        User.findOne({ where: { username: req.params.username } })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this email found.' })
                }
                res.json(dbUserData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
        )
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = userController
