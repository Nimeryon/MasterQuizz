const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");
//Resolvers
const QuestionResolver = require("./resolvers/Question");
const CategorienResolver = require("./resolvers/Categorie");
const resolvers = [QuestionResolver, CategorienResolver];
//Schemas
const typeDefs = require("./schemas");

//Secrets only local
const secrets = require("./secrets");
const bddUsername = process.env.MongoUser != null ? process.env.MongoUser : secrets.bddUsername;
const bddpassword = process.env.MongoPassword != null ? process.env.MongoPassword : secrets.bddpassword;

mongoose.connect(`mongodb+srv://${bddUsername}:${bddpassword}>@masterquizz.4dkdx.mongodb.net/<dbname>?retryWrites=true&w=majority`);

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", () => {
    server.start(() => console.log('Server is running on http://localhost:4000'));
});