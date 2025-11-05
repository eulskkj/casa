import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './style.css';


function ListaCliente() {
    const [clientes, setClientes] = useState([]);   
    const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchClientes() {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            setLoading(false);
        }
    }

    fetchClientes();
}, []);
    if (loading) {
        return <div className='lista-container'><h2>Carregando clientes...</h2></div>;
    }

    return (
        <div className='lista-container'>
            <h2>Lista de Clientes</h2>
            {clientes.length === 0 ? (
                <p>Nenhum cliente cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListaCliente;
