import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {


  return (
    <>
    <Navbar/>
    <div className='min-h-[87vh]'>
        <Manager />
    </div>
   
    <Footer/>
    </>
  )
}

export default App
