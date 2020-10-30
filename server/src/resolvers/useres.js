const User = require('../models/users')
const bcrypt = require('bcryptjs')
module.exports = {
    createUser: async ({
        input
    }) => {
        const findUser = await User.findOne({
            email : input.email
        })
        if (findsUser){ //if already user with that email 
            return new Error("Users already exists")
        }
        //hashing pw 
        const saltRounds = 12;
        
        bcrypt.genSalt(saltRounds, (err,salt) => {
            bcrypt.hash(input.password, salt, 
                (err,hash) => {
                    const user = new User({
                        username: input.username,
                        email: input.email,
                        password: hash,
                    });
                    try {
                        const result = user.save()
                        return {
                            ...result._doc,
                            password: null
                        }
                    } catch (error) {
                        throw error
                    }
            })
        });
       
        
    }
}

//TODO : CONNECT USERS TO NOTES