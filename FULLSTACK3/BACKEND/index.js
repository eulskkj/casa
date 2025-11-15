const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('db_atv3', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


const Mensagem = sequelize.define('mensagens', {
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});



app.get('/', (req, res) => {
  res.send("API rodando!");
});


app.get('/mensagens', async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll({
      order: [['id', 'DESC']]
    });
    res.json(mensagens);
  } catch (erro) {
    console.error("Erro ao listar:", erro);
    res.status(500).json({ error: "Erro ao buscar mensagens" });
  }
});


app.post('/mensagens', async (req, res) => {
  try {
    const { autor, mensagem } = req.body;

    const nova = await Mensagem.create({
      autor,
      mensagem
    });

    res.status(201).json(nova);
  } catch (erro) {
    console.error("Erro ao criar:", erro);
    res.status(500).json({ error: "Erro ao criar mensagem" });
  }
});


app.post('/mensagens/:id/like', async (req, res) => {
  try {
    const { id } = req.params;

    const msg = await Mensagem.findByPk(id);

    if (!msg) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }

    msg.like++;
    await msg.save();

    res.json({ like: msg.like });
  } catch (erro) {
    console.error("Erro ao curtir:", erro);
    res.status(500).json({ error: "Erro ao curtir mensagem" });
  }
});


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
    console.log("Banco sincronizado ✔");
  });
});
