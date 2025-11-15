import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './services/api.jsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const esquemaDeComentarios = yup.object({
  autor: yup.string().required("O autor é obrigatório"),
  mensagem: yup.string().required("A mensagem é obrigatória"),
});

function App() {
  const [estaEnviando, setEstaEnviando] = useState(false);
  const [lista, setLista] = useState([]);

  const {
    register: registrarComentario,
    handleSubmit: lidarComEnvioDoComentario,
    formState: { errors: errosDeComentario },
    reset: resetarFormularioDeComentario,
  } = useForm({
    resolver: yupResolver(esquemaDeComentarios),
    defaultValues: {
      autor: '',
      mensagem: '',
    },
  });

  // Carregar comentários ao abrir a página
  useEffect(() => {
    carregarComentarios();
  }, []);

  async function carregarComentarios() {
    try {
      const resposta = await api.get('/mensagens');
      setLista(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar comentários:", erro);
      toast.error("Erro ao carregar comentários");
    }
  }

  async function enviarComentario(dadosDoComentario) {
    try {
      setEstaEnviando(true);
      await api.post('/mensagens', {
        ...dadosDoComentario,
        data: new Date(),
      });

      toast.success('Comentário cadastrado com sucesso!');
      resetarFormularioDeComentario();
      carregarComentarios();
    } catch (error) {
      console.error('Erro ao cadastrar comentário:', error);
      toast.error('Erro ao cadastrar comentário.');
    } finally {
      setEstaEnviando(false);
    }
  }

  async function curtir(id) {
    try {
      await api.post(`/mensagens/${id}/like`);
      carregarComentarios();
    } catch (err) {
      toast.error("Erro ao curtir");
    }
  }

  return (
    <div className="cadrasto-mensagem-container">

      <ToastContainer />

      <h2>Cadastrar Comentário</h2>

      <form noValidate onSubmit={lidarComEnvioDoComentario(enviarComentario)}>

        {/* Autor */}
        <div className="form-group">
          <label htmlFor="campo-autor">Autor:</label>
          <input
            id="campo-autor"
            type="text"
            {...registrarComentario("autor")}
          />
        </div>
        {errosDeComentario.autor && (
          <p className="error-message">{errosDeComentario.autor.message}</p>
        )}

        {/* Mensagem */}
        <div className="form-group">
          <label htmlFor="campo-mensagem">Mensagem:</label>
          <input
            id="campo-mensagem"
            type="text"
            {...registrarComentario("mensagem")}
          />
        </div>
        {errosDeComentario.mensagem && (
          <p className="error-message">{errosDeComentario.mensagem.message}</p>
        )}

        <button type="submit" disabled={estaEnviando}>
          {estaEnviando ? 'Enviando...' : 'Cadastrar Comentário'}
        </button>
      </form>

      {/* LISTA DE COMENTÁRIOS */}
      <h2>Comentários</h2>

      <div className="lista-comentarios">
        {lista.length === 0 && <p>Nenhum comentário ainda.</p>}

        {lista.map((item) => (
          <div key={item.id} className="comentario">
            <p><strong>{item.autor}</strong></p>
            <p>{item.mensagem}</p>
            <p>{new Date(item.data).toLocaleString()}</p>

            <button onClick={() => curtir(item.id)}>
              👍 {item.like}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
