const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorieSchema = new Schema({
    title: String
});
const Categorie = mongoose.model("Categorie", CategorieSchema);

const CategorieResolver = {
    categorie: async (_, { id }) => {
        return Categorie.findById(id);
    },
    categories: () => Categorie.find(),
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
};

module.exports = CategorieResolver;