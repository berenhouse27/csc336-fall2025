import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'

function App() {
  // Selectively run functions when given states change
  // first arg is the function to run
  // second arg are the states to trackc (empty will just run once at startup)
  

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
            <Route path='/' element={<Home/>}/>   
            <Route path='/About' element={<About/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
