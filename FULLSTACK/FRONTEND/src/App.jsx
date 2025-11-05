import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CadastroCliente from './pages/CadastroCliente'
import CadastroProduto from './pages/CadastroProduto'
import ListaCliente from './pages/ListaCliente'
import ListaProduto from './pages/ListaProduto'
import './App.css'


import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Header/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />}/> 
        <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
        <Route path="/cadastro-produto" element={<CadastroProduto/>}/>
        <Route path="/lista-cliente" element={<ListaCliente/>}/>
        <Route path="/lista-produto" element={<ListaProduto/>}/>
      </Routes>
    </main>
    <Footer/>
    </>
  )
}
export default App;
