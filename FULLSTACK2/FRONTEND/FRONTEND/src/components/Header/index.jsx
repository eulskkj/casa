import './style.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className= "header">
            <div className='logo'>Farmacia Vida & Saúde</div>
            <nav>
                <Link to="/">Home</Link> <br />
                <Link to="/sobre-nos">Sobre Nós</Link><br />
                <Link to="/servicos">Serviços</Link><br />
                <Link to="/fale-conosco">Fale conosco</Link> <br />

            </nav>
        </header>
    );
}
export default Header;