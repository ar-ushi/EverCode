const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = {
    createUser: async ({
        input
    }) => {
        const findUser = await User.findOne({
            email : input.email,
        })
        if (findUser){ //if already user with that email 
            return new Error("User already exists")
        }
        //hashing pw
        const hashedPassword =await  bcrypt.hash(input.password, 12)
        const user = new User({
            username: input.username,
            email: input.email,
            password: hashedPassword
        })
        try {
            const result = await user.save()
            return {
                ...result._doc,
                password: null
            }
        } catch (error) {
            throw error
        }
    },
    login : async({email,password}) =>{
        try{
            const findUser =await  User.findOne({
                email: email
            })
            if (!findUser){
                return new Error("User doesn't exist")
            }
            const matchPassword = await bcrypt.compare(password, password)
            if (!matchPassword){
                return new Error("Passwords don't match")
            }
            const token = jwt.sign({userId: findUser._id, email: findUser.email, })

        }catch{

        }
    }
}

//TODO : CONNECT USERS TO NOTES