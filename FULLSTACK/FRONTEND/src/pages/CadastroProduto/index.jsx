import { useForm} from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import api from "../../services/api";
import "./style.css";

const esquemaDeCadastroProduto = yup.object({
    nome: yup
    .string()
    .required("O nome do produto é obrigatório")
    .min(3, "O nome do produto deve ter pelo menos 3 caracteres"),
    lote: yup
    .string()
    .required("O lote é obrigatório"),
    validade: yup
    .date()
    .required("A validade é obrigatória"),
    categoria: yup
    .string()
    .required("A categoria é obrigatória"),
    quantidade: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .required("A quantidade é obrigatória")
    .min(1, "A quantidade deve ser pelo menos 1"),
});

function CadastroProduto() {
    const [estaEnviando, setEstaEnviando] = useState(false);
    const {
        register: registrarCampo,
        handleSubmit: lidarComEnvioDoFormulario,
        formState: {errors: errosDoFormulario},
        setError: definirErroNoCampo,
        reset: limparCampoDoFormulario,
    } = useForm({
        resolver: yupResolver(esquemaDeCadastroProduto),
        defaultValues: {nome: "", lote: "", validade: "", categoria: "", quantidade: "" },
    });

async function enviarDados(dadosDoProduto) {
    try {
        setEstaEnviando(true);
        await api.post("/produtos", dadosDoProduto);
        toast.success("Produto cadastrado com sucesso!");
        limparCampoDoFormulario();
    } catch (error) {
        const codigoDeStatus = error.response?.status;
        const mensagemDoServidor =
        error?.response?.data?.menssage || error?.response?.data?.error || "";

        if (codigoDeStatus === 409 || mensagemDoServidor.toLowerCase().includes("lote")) {
            definirErroNoCampo("lote", {
                type: "server",
                message: "Este lote já está em uso.",
            });
        }
        toast.error("Erro ao cadastrar o produto. Por favor, tente novamente.");
        console.log("Erro ao cadastrar o produto:", error);
    } finally {
            setEstaEnviando(false);
    }
}
    return (
        <div className="cadastro-produto-container">
            <h2>Cadastro de Produto</h2>    

            <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
                {/* Nome */}    
                <div className="form-group">
                    <label htmlFor="campo-nome">Nome</label>
                    <input
                        id="campo-nome"
                        type="text"
                        {...registrarCampo("nome")}
                    />
                </div>
                    {errosDoFormulario.nome && (
                        <p className="error-message">{errosDoFormulario.nome.message}</p>
                    )}
                {/* Lote */}
                <div className="form-group">
                    <label htmlFor="campo-lote">Lote</label>
                    <input
                        id="campo-lote"
                        type="text"
                        {...registrarCampo("lote")}
                    />
                </div>
                    {errosDoFormulario.lote && (
                        <p className="error-message">{errosDoFormulario.lote.message}</p>
                    )}

                {/* Validade */}
                <div className="form-group">
                    <label htmlFor="campo-validade">Validade</label>
                    <input
                            id="campo-validade"
                            type="date"
                            {...registrarCampo("validade")}
                        />
                </div>
                {errosDoFormulario.validade && (
                    <p className="error-message">{errosDoFormulario.validade.message}</p>
                )}

                {/* categoria */}
                    <div className="form-group">
                        <label htmlFor="campo-categoria">Categoria</label>
                        <input
                            id="campo-categoria"
                            type="text"
                            {...registrarCampo("categoria")}
                        />
                    </div>
                    {errosDoFormulario.categoria && (
                        <p className="error-message">{errosDoFormulario.categoria.message}</p>
                    )}
                    
                {/* Quantidade */}
                <div className="form-group">
                    <label htmlFor="campo-quantidade">Quantidade</label>
                    <input
                        id="campo-quantidade"
                        type="number"
                        {...registrarCampo("quantidade", { valueAsNumber: true })}
                    />
                </div>
                    {errosDoFormulario.quantidade && (
                        <p className="error-message">{errosDoFormulario.quantidade.message}</p>
                    )}  
                <button type="submit" disabled= {estaEnviando}>
                    {estaEnviando ? "Cadastrando..." : "Cadastrar Produto"}
                </button>
            </form>
        </div>
    );
}
export default CadastroProduto;