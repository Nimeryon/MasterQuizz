require('dotenv').config();
//Path
const path = require("path");
//Express
const express = require('express');
const helmet = require('helmet');
let app = express();
//Mongoose
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
//Resolvers
const QuestionResolver = require("./resolvers/Question");
const CategorieResolver = require("./resolvers/Categorie");
const resolvers = { ...QuestionResolver, ...CategorieResolver };
//Schemas
const schema = require("./schemas");

const uri = `mongodb+srv://${process.env.MongoUser}:${process.env.MongoPassword}@masterquizz.4dkdx.mongodb.net/${process.env.MongoDb}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let port = process.env.PORT || 3000;

// utilisation de helmet et désactivation de l'entête signifiant l'utilisation d'express
app.use(helmet());
app.disable("x-powered-by");
app.use(express.static(__dirname + '/../public'));
app.use(
    "/api",
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    })
);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`)
        })
    })
    .catch(error => {
        throw error;
    });