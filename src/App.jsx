import { Outlet } from 'react-router-dom'
import './App.css'
import { Navbar, Footer } from './components'

function App() {
  return (
    <>
    <div className='bg-black min-h-screen'>

      <Navbar />
      <div className='min-h-screen relative'>
        <Outlet />
        </div>
       <Footer />
      </div>
    </>
  )
}

export default App
