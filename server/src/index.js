const express = require("express");
const { graphqlHTTP }  = require("express-graphql");
const app = express();
const { schemaBuilt, resolver } = require('./models/schema');
const mongoose = require("mongoose");

mongoose.connect(INSERTYOUROWNMONGOLINK, 
{
    useNewUrlParser : true,
    useUnifiedTopology: true ,
},
)

app.use(
    "/graphql",  //endpoint
    graphqlHTTP({
        schema : schemaBuilt,
        rootValue : resolver,
        graphiql: true
    }),
)

const port = process.env.PORT || 1339;
app.listen(port,() => {
    console.log(`Listening at http://localhost:${port}`)
});

