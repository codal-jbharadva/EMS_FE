import './App.css'
import Navbar from './component/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './component/footer/Footer'
import Details from './pages/details/Details'
function App() {

  return (
    <>
      <Navbar/>
        <Home></Home>
        <Details></Details>
      <Footer/>
    </>
  )
}

export default App
