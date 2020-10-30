const User = require('../models/users')

module.exports = {
    createUser: async ({
        input
    }) => {
        const user = new User({
            username: input.username,
            email: input.email,
            password: input.password
        })
        try {
            const result = await user.save()
            return {
                ...result._doc
            }
        } catch (error) {
            throw error
        }
    }
}

//TODO : CONNECT USERS TO NOTES