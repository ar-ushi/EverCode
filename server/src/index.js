const express = require("express");
const { graphqlHTTP }  = require("express-graphql");
const app = express();
const { schemaBuilt } = require('./models/schema');
const allResolvers = require("./resolvers/resolvers")
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, 
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

