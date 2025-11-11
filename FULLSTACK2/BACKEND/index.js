const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_atv2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


var clientes = sequelize.define('clientes', { 

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


const app = express();
app.use(cors());

app.use(express.json()); 

const port = 3000;

app.get('/', (req, res) => {
    res.send('API de Clientes está funcionando!');
});

app.get('/clientes', async (req, res) => {
    try {
        const todosClientes = await clientes.findAll();
        res.json(todosClientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone, mensagem } = req.body;
        const novoCliente = await clientes.create({ nome, email, telefone, mensagem });
        res.status(201).json(novoCliente);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(409).json({ message: 'Dados inválidos. Verifique os campos e tente novamente.' });
        }
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log('Banco de dados sincronizado.');
    });
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});