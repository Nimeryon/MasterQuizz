// Models
const Categorie = require("../models/Categorie");

const resolver = {
    Query: {
        categorie: async (_, { id }) => {
            return Categorie.findById(id);
        },
        categories: () => Categorie.find()
    },
    Mutation: {
        createCategorie: async (_, { title }) => {
            const categorie = new Categorie({ title });
            await categorie.save();
            return categorie;
        },
        updateCategorie: async (_, { id, title }) => {
            await Categorie.findByIdAndUpdate(id, { title });
            return true;
        },
        deleteCategorie: async (_, { id }) => {
            await Categorie.findByIdAndRemove(id);
            return true;
        }
    }
};

module.exports = resolver;