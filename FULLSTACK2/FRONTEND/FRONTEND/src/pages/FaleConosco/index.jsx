import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./style.css";


const esquemaDeContato = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido."),
  telefone: yup
    .string()
    .required("O telefone é obrigatório.")
    .matches(/^[0-9 ()-]{8,15}$/, "Digite um telefone válido com DDD."),
  mensagem: yup
    .string()
    .required("A mensagem é obrigatória.")
    .min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

function FaleConosco() {
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(esquemaDeContato),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });


  async function enviarDados(dados) {
    try {
      setEnviando(true);

      await api.post("/clientes", dados);

      toast.success("Mensagem enviada com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Ocorreu um erro ao enviar. Tente novamente.";
      toast.error(msg);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="faleconosco-container">
      <h2>Fale Conosco</h2>

      <form noValidate onSubmit={handleSubmit(enviarDados)}>
        {/* Nome */}
        <div className="form-group">
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Seu nome completo"
            {...register("nome")}
            disabled={enviando}
          />
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="campo-email">E-mail</label>
          <input
            id="campo-email"
            type="email"
            placeholder="seuemail@gmail.com"
            {...register("email")}
            disabled={enviando}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="form-group">
          <label htmlFor="campo-telefone">Telefone</label>
          <input
            id="campo-telefone"
            type="tel"
            placeholder="(11) 99999-8888"
            {...register("telefone")}
            disabled={enviando}
          />
          {errors.telefone && (
            <p className="error-message">{errors.telefone.message}</p>
          )}
        </div>

        {/* Mensagem */}
        <div className="form-group">
          <label htmlFor="campo-mensagem">Mensagem</label>
          <textarea
            id="campo-mensagem"
            placeholder="Digite sua mensagem..."
            {...register("mensagem")}
            disabled={enviando}
          ></textarea>
          {errors.mensagem && (
            <p className="error-message">{errors.mensagem.message}</p>
          )}
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
}

export default FaleConosco;
