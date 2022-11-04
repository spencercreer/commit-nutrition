const { User } = require('../models')

const userController = {
    async login({ body }, res) {
        try {
            if (!body.password || !(body.username || body.email)) {
                console.log(body.password)
                return res.status(400).json({ message: "Invalid user credentials." });
            }

            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
    
            const correctPw = await user.comparePassword(body.password);
            if (!correctPw) {
                return res.status(400).json({ message: 'Invalid user credentials.' });
            }
            // const token = signToken(user);
            res.json({
                // token,
                user
            });
        } catch {
            res.status(500).json({ message: 'Server error: Login'})
        }
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
