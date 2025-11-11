import {Routes, Route } from 'react-router-dom'
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import Home from './pages/HomePage/index.jsx'
import Servicos from './pages/Servicos/index.jsx'
import SobreNos from './pages/SobreNos/index.jsx'
import FaleConosco from './pages/FaleConosco/index.jsx'

import './App.css'

function App() {
  return (
    <>
    <div className='app'>
      <Header/>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/servicos' element={<Servicos/>}/>
          <Route path='/sobre-nos' element={<SobreNos/>}/>
          <Route path='fale-conosco' element={<FaleConosco/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default App;