const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");
//Resolvers
const QuestionResolver = require("./resolvers/Question");
const CategorienResolver = require("./resolvers/Categorie");
const resolvers = [QuestionResolver, CategorienResolver];
//Schemas
const typeDefs = require("./schemas");

mongoose.connect("mongodb://localhost/test");

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", () => {
  server.start(() => console.log('Server is running on http://localhost:4000'));
});