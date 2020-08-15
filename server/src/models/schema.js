const { buildSchema } = require("graphql");
const note = require('./notes')
const data = [{
    id: 1,
    title: "note 1",
    content: "today was a good day",
    image: "image!"
},];


const schemaBuilt = buildSchema(`
type Query{
    notes: [note]
    Note(id: ID) : note
}
type note{
    id : ID
    title : String
    content : String
    image : String
    userCreator: User
}
type User{
    _id : ID
    username : String
    email : String
    password : String 
    createdNotes: [note]
}

input noteinput{
    title : String,
    content: String,
    image: String
}
input userinput{
    username : String
    email : String
    password : String
}
type Mutation {
    createNote(input : noteinput) : note!
    createUser(input : userinput) : User!
    deleteNote(id : ID):  note
}
`);

const resolver = {
    createNote: async({input}) =>{
        const Note = new note({
            title: input.title,
            content: input.content,
            image: input.image
        }) //need to include the user creator to link this note to one user
        let notes;
        try {
        const result = await Note.save() //saved document
        notes = {
            ...result._doc// The spread syntax allows an expression to be expanded in places where multiple arguments are expected.
        }
    } catch (error) {
        return Error(error)
    }
    return notes
    }
};



module.exports = {
    schemaBuilt,
    resolver
}