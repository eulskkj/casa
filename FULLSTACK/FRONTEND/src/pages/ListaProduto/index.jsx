import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';

function ListaProduto() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchProdutos() {
            try { 
                const response = await api.get('/produtos');
                setProdutos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setLoading(false);
            }
        }

        fetchProdutos();
    }, []);

    if (loading) {
        return <div className='lista-container'><h2>Carregando produtos...</h2></div>;
    }
    return (
        <div className='lista-container'>
            <h2>Lista de Produtos</h2>
            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Lote</th>
                            <th>Validade</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.lote}</td>
                                <td>{produto.validade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}   
export default ListaProduto;