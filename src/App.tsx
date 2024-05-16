import './App.css'
import Navbar from './component/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './component/footer/Footer'
import Details from './pages/details/Details'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/details' element={<Details/>}></Route>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
