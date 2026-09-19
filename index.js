const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/produtos', productRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando e o MongoDB está conectado.');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});