const notesResolver = require('./noteres')
const usersResolver = require('./useres')


const allResolvers = {
    ...usersResolver,
    ...notesResolver,
}
module.exports = allResolvers