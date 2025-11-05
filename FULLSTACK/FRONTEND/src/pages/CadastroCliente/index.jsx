import { set, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import api from "../../services/api";
import "./style.css";


const esquemaDeCadastoCliente = yup.object({
    nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: yup
    .string()
    .required("O email é obrigatório")
    .email("Insira um email válido"),
    telefone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(/^\d{10,11}$/, "Insira um telefone válido com 10 ou 11 dígitos"),
    formaPagamento: yup
    .string()
    .required("A forma de pagamento é obrigatória"),
    endereco: yup
    .string()
    .required("O endereço é obrigatório")
    .min(5, "O endereço deve ter pelo menos 5 caracteres"),
});

function CadastroCliente() {
    const [estaEnviando, setEstaEnviando] = useState(false);
    const {
        register: registrarCampo,
        handleSubmit: lidarComEnvioDoFormulario,
        formState: { errors: errosDoFormulario },
        setError: definirErroNoCampo,
        reset: limparCampoDoFormulario,
    } = useForm({
        resolver: yupResolver(esquemaDeCadastoCliente),
        defaultValues: {nome: "", email: "", telefone: "", formaPagamento: "", endereco: "" },
    });


async function enviarDados(dadosDoCliente) {
    try {
        setEstaEnviando(true);
        await api.post("/clientes", dadosDoCliente);
        alert("Cliente cadastrado com sucesso!");
        limparCampoDoFormulario();
    } catch (error) {
        const codigoDeStatus = error.response?.status;
        const mensagemDoServidor =
        error?.response?.data?.menssage || error?.response?.data?.error || "";
    
    if (codigoDeStatus === 409 || mensagemDoServidor.toLowerCase().includes("email")) {
        definirErroNoCampo("email", {
            type: "server",
            message: "Este email já está em uso.",
        });
    }
        toast.error("Erro ao cadastrar o cliente. Por favor, tente novamente.");
        console.log("Erro ao cadastrar o cliente:", error);
    } finally {
        setEstaEnviando(false);
    }
}
    return (
        <div className="cadastro-container">
        <h2>Cadastro de Cliente</h2>
        <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
            {/* Nome */}
            <div className="form-group">
                <label htmlFor="campo-nome">Nome</label>
                <input
                    id="campo-nome"
                    placeholder="Ex: João Silva"
                    {...registrarCampo("nome")}
                    />
            </div>
                {errosDoFormulario.nome && (
                    <p className="error-message">{errosDoFormulario.nome.message}</p>
                )}

            {/* Email */}
            <div className="form-group">
                <label htmlFor="campo-email">Email</label>
                <input
                    id="campo-email"
                    type="email"
                    placeholder="Ex: JoaoSilva31@gmail.com"
                    {...registrarCampo("email")}
                />
            </div>  
                {errosDoFormulario.email && (
                    <p className="error-message">{errosDoFormulario.email.message}</p>
                )}

            {/* Telefone */}
            <div className="form-group">
                <label htmlFor="campo-telefone">Telefone</label>
                <input
                    id="campo-telefone"
                    type="tel"
                    placeholder="Ex: (11) 91234-5678"
                    {...registrarCampo("telefone")}
                />
            </div>  
                {errosDoFormulario.telefone && (
                    <p className="error-message">{errosDoFormulario.telefone.message}</p>
                )}

            {/* Forma de Pagamento */}
            <div className="form-group">
                <label htmlFor="campo-formapagamento">Forma de pagamento</label>
                <input
                    id="campo-formapagamento"
                    type="text"
                    placeholder="Ex: Cartão de Crédito"
                    {...registrarCampo("formaPagamento")}
                    />
            </div>  
                {errosDoFormulario.formaPagamento && (
                    <p className="error-message">{errosDoFormulario.formaPagamento.message}</p>
                )}

            {/* Endereço */}
            <div className="form-group">
                <label htmlFor="campo-endereco">Endereço</label>
                <input
                    id="campo-endereco"
                    type="text"
                    placeholder="Ex: Rua das Flores, 123"
                    {...registrarCampo("endereco")}
                />
            </div>
                {errosDoFormulario.endereco && (
                    <p className="error-message">{errosDoFormulario.endereco.message}</p>
                )}

            <button type="submit" disabled= {estaEnviando}>
                {estaEnviando ? "Cadastrando..." : "Cadastrar Cliente"}
                </button> 
            </form>
        </div>
    );
}

export default CadastroCliente;

        
