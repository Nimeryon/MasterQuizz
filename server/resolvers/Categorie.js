const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorieSchema = new Schema({
    title: String
});
const Categorie = mongoose.model("Categorie", CategorieSchema);

const CategorieResolver = {
    categorie: async ({ id }) => {
        try {
            return Categorie.findById(id);
        } catch (error) {
            throw error;
        }
    },
    categories: () => {
        try {
            return Categorie.find();
        } catch (error) {
            throw error;
        }
    },
    createCategorie: async ({ title }) => {
        try {
            const categorie = new Categorie({ title });
            await categorie.save();
            return categorie;
        } catch (error) {
            throw error;
        }
    },
    updateCategorie: async ({ id, title }) => {
        try {
            await Categorie.findByIdAndUpdate(id, { title });
            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteCategorie: async ({ id }) => {
        try {
            await Categorie.findByIdAndRemove(id);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = CategorieResolver;