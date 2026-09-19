const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/productModel');

dotenv.config();

const produtos = [
    {
        nome: 'Camiseta Básica Algodão',
        preco: 49.90,
        categoria: 'Roupas',
        estoque: 150,
        descricao: 'Camiseta básica em algodão penteado, confortável e durável.',
        especificacoes: { tamanho: 'M', cor: 'Branca' },
    },
    {
        nome: 'Calça Jeans Slim',
        preco: 129.90,
        categoria: 'Roupas',
        estoque: 80,
        descricao: 'Calça jeans com corte slim, ideal para o dia a dia.',
        especificacoes: { tamanho: '42', cor: 'Azul', tecido: 'Denim' },
    },
    {
        nome: 'Tênis Esportivo Corrida',
        preco: 299.90,
        categoria: 'Calçados',
        estoque: 45,
        descricao: 'Tênis leve e anatômico para corridas de longa distância.',
        especificacoes: { tamanho: '40', cor: 'Preto', material: 'Mesh' },
    },
    {
        nome: 'Geladeira Frost Free 400L',
        preco: 2899.00,
        categoria: 'Eletrodomésticos',
        estoque: 12,
        descricao: 'Geladeira com tecnologia frost free e controle digital de temperatura.',
        especificacoes: { voltagem: '220V', potencia: '300W', capacidade: '400L' },
    },
    {
        nome: 'Micro-ondas 20L',
        preco: 549.90,
        categoria: 'Eletrodomésticos',
        estoque: 30,
        descricao: 'Micro-ondas com painel digital e 8 programas de aquecimento.',
        especificacoes: { voltagem: '220V', potencia: '800W', capacidade: '20L' },
    },
    {
        nome: 'Liquidificador Turbo 1000W',
        preco: 199.90,
        categoria: 'Eletrodomésticos',
        estoque: 60,
        descricao: 'Liquidificador com motor turbo e copo em vidro.',
        especificacoes: { voltagem: '110V', potencia: '1000W' },
    },
    {
        nome: 'Smartphone Android 128GB',
        preco: 1899.00,
        categoria: 'Eletrônicos',
        estoque: 25,
        descricao: 'Smartphone com tela AMOLED de 6.4 polegadas e câmera tripla.',
        especificacoes: { armazenamento: '128GB', memoria: '8GB', tela: '6.4"' },
    },
    {
        nome: 'Notebook 8GB SSD 256GB',
        preco: 3499.00,
        categoria: 'Eletrônicos',
        estoque: 18,
        descricao: 'Notebook com processador Intel Core i5 e SSD de 256GB.',
        especificacoes: { processador: 'i5', memoria: '8GB', armazenamento: '256GB SSD' },
    },
    {
        nome: 'Fone de Ouvido Bluetooth',
        preco: 249.90,
        categoria: 'Eletrônicos',
        estoque: 120,
        descricao: 'Fone de ouvido sem fio com cancelamento de ruído ativo.',
        especificacoes: { conectividade: 'Bluetooth 5.2', bateria: '24h', cor: 'Preto' },
    },
];

const seedDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('Erro: a variável MONGO_URI não está configurada no arquivo .env');
            console.error('Crie uma conta gratuita no MongoDB Atlas e cole a connection string em .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado com sucesso!');

        await Product.deleteMany({});
        console.log('Coleção de produtos limpa.');

        await Product.insertMany(produtos);
        console.log(`Seed concluído com sucesso! ${produtos.length} produtos inseridos.`);

        await mongoose.connection.close();
        console.log('Conexão encerrada.');
    } catch (error) {
        console.error('Erro ao executar o seed:', error);
        process.exit(1);
    }
};

seedDatabase();