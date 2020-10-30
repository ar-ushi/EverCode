const {
    buildSchema
} = require("graphql");
const note = require('./notes');
const users = require("./users");


const schemaBuilt = buildSchema(`
type Query{
    notes: [note]
    Note(_id: ID) : note
}
type note{
    _id : ID
    title : String
    content : String
    image : String
    userCreator: User!
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
    updateNote(_id : ID!,title : String,content: String, image: String) : note
    deleteNote(_id : ID):  note
}
`);

const resolver = {
    notes: async () => {
        try {
            const allNotes = await note.find((err, notes) => {
                if (err) return err
                return notes
            }) //? note is our collection here 
            return allNotes
        } catch (error) {
            throw error
        }

    },
    Note: async ({
        _id
    }) => {
        try {
            const oneNote = await note.findById({
                _id: _id
            })
            return oneNote._doc
        } catch (error) {
            throw error
        }
    },
    deleteNote: async ({
        _id
    }) => {
        try {
            const delNote = await note.findByIdAndDelete({
                _id: _id
            })
            return delNote
        } catch (error) {
            throw error
        }
    },
    updateNote: async ({_id, title, content, image}) => {
        try{
            const mynote =  await note.findById({
                _id: _id
            })
            if (!mynote){
                throw new Error(`Couldn't find user with id ${_id}`);
            }
            if (title !== undefined){
                mynote.title = title;
            }
            if (content !== undefined){
                mynote.content = content;
            }
            if (image !== undefined){
                mynote.image = image;
            }
            try{
                const result = await mynote.save()
                res = {
                    ...result._doc
                }
                return res
            }catch(error){
                throw error
            }
        }catch (error) {
            throw error
        }
    },
    createNote: async ({
        input
    }) => {
        const Note = new note({
            title: input.title,
            content: input.content,
            image: input.image,
        }) //need to include the user creator to link this note to one user
        let notes;
        try {
            const result = await Note.save() //saved document
            notes = {
                ...result._doc
                // The spread syntax allows an expression to be expanded in places where multiple arguments are expected.
            }
            return notes
        
        } catch (error) {
            throw error
        }
    }
};




module.exports = {
    schemaBuilt,
    resolver
}