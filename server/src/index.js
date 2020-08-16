const express = require("express");
const { graphqlHTTP }  = require("express-graphql");
const app = express();
const { schemaBuilt } = require('./models/schema');
const allResolvers = require("./resolvers/resolvers")
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://evernote_admin:lifeismeisthepassword@cluster0.oegma.mongodb.net/evernote_clone?retryWrites=true&w=majority`, 
{
    useNewUrlParser : true,
    useUnifiedTopology: true ,
},
)

app.use(
    "/graphql",  //endpoint
    graphqlHTTP({
        schema : schemaBuilt,
        rootValue : allResolvers,
        graphiql: true
    }),
)

const port = process.env.PORT || 1339;
app.listen(port,() => {
    console.log(`Listening at http://localhost:${port}`)
});

