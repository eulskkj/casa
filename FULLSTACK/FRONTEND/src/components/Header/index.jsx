import { Link } from 'react-router-dom';
import './style.css';

function Header() {
    return (
        <header className="header"> 
            <div className='logo'>Sistema de Clientes</div>
            <nav>
                <Link to ="/">Home</Link>
                <Link to ="/cadastro-cliente">Cadastro de Cliente</Link>
                <Link to ="/cadastro-produto">Cadastro de Produto</Link>
                <Link to ="/lista-cliente">Lista de Cliente</Link>
                <Link to ="/lista-produto">Lista de Produto</Link>
            </nav>
        </header>
    );
}
export default Header;