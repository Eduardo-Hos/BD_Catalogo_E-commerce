const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
        min: 0,
    },
    categoria: {
        type: String,
        required: true,
    },
    estoque: {
        type: Number,
        required: true,
        min: 0,
    },
    descricao: {
        type: String,
        default: '',
    },
    especificacoes: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;