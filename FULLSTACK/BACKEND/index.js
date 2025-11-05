const express = require('express');
const cors = require('cors');
const {Sequelize, DataTypes} = require('sequelize');


const sequelize= new Sequelize('db_atv', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

const cliente = sequelize.define('Cliente', {
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
    formaPagamento: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    validade: {
        type: DataTypes.DATE,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.get('/clientes', async (req, res) => {
    const clientes = await cliente.findAll();
    res.json(clientes); 
});
app.get ('/produtos', async (req, res) => {
    const produtos = await produto.findAll();
    res.json(produtos);
});
app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone, formaPagamento, endereco } = req.body;
        const novoCliente = await cliente.create({ nome, email, telefone, formaPagamento, endereco });
        res.status(201).json(novoCliente);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(409).json({ message: 'Dados inválidos. Verifique os campos e tente novamente.' });
        }
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });    
    }
});
app.post('/produtos', async (req, res) => {
    try {
        const { nome, lote, validade, categoria, quantidade } = req.body;
        const novoProduto = await produto.create({ nome, lote, validade, categoria, quantidade });
        res.status(201).json(novoProduto);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(409).json({ message: 'Dados inválidos. Verifique os campos e tente novamente.' });
        }
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });    
    }

});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log('Banco de dados sincronizado com MySQL.');
    });
}).catch((err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
}))

