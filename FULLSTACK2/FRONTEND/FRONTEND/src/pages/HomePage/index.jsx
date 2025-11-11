import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Farmácia Vida & Saúde.</h1>
          <p>
           Cuidando da sua saúde com carinho, confiança e dedicação.
          </p>
          <p>
Atendimento rápido, produtos de qualidade e serviços farmacêuticos que fazem a diferença no seu dia a dia.
          </p>
          <Link to="/fale-conosco" className="btn">
            Fale Conosco
          </Link>
          <Link to="/servicos" className="btn btn-light">
            Nossos Serviços
          </Link>
          <Link to="/sobre-nos" className="btn btn-light">
            Sobre nós
          </Link>
          <Link to="/lista-cliente" className="btn btn-light">
            Lista de Clientes 
          </Link>
        </div>
         <section className="hero-logo">
          <img src={logo} alt="Logo" />
        </section>
      </section>
    </div>
  );
}

export default Home;