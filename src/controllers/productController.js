const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        const { nome, preco, categoria, estoque, descricao, especificacoes } = req.body;

        if (!nome || !categoria || preco === undefined || estoque === undefined) {
            return res.status(400).json({
                message: 'Os campos nome, preco, categoria e estoque são obrigatórios',
            });
        }

        const newProduct = new Product({
            nome,
            preco,
            categoria,
            estoque,
            descricao,
            especificacoes,
        });

        await newProduct.save();

        res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
};

const getProducts = async (req, res) => {
    try {
        const { categoria, precoMin, precoMax, busca, limit, skip, ordem } = req.query;

        const filtro = {};

        if (categoria) {
            filtro.categoria = { $eq: categoria };
        }

        if (precoMin !== undefined || precoMax !== undefined) {
            filtro.preco = {};
            if (precoMin !== undefined) {
                filtro.preco.$gte = Number(precoMin);
            }
            if (precoMax !== undefined) {
                filtro.preco.$lte = Number(precoMax);
            }
        }

        if (busca) {
            const regex = new RegExp(busca, 'i');
            filtro.$or = [
                { nome: regex },
                { descricao: regex },
            ];
        }

        const limite = parseInt(limit, 10) || 10;
        const pular = parseInt(skip, 10) || 0;

        const ordenacao = ordem === 'desc' ? { preco: -1 } : { preco: 1 };

        const products = await Product.find(filtro)
            .sort(ordenacao)
            .skip(pular)
            .limit(limite);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produtos', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produto', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { nome, preco, categoria, estoque, descricao, especificacoes } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { nome, preco, categoria, estoque, descricao, especificacoes },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};

const updateStock = async (req, res) => {
    try {
        const { operacao, quantidade } = req.body;

        if (!operacao || !quantidade) {
            return res.status(400).json({
                message: 'Os campos operacao (incrementar/decrementar) e quantidade são obrigatórios',
            });
        }

        let valor = 0;
        if (operacao === 'incrementar') {
            valor = Number(quantidade);
        } else if (operacao === 'decrementar') {
            valor = -Number(quantidade);
        } else {
            return res.status(400).json({
                message: 'A operação deve ser "incrementar" ou "decrementar"',
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { estoque: valor } },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Estoque atualizado com sucesso', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar estoque', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
};