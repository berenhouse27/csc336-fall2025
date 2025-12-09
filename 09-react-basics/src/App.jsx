import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Ratings from "./Ratings.jsx";
import About from "./About.jsx";
import { useState } from "react";
import ListItem from "./ListItem.jsx";

function App() {

  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/movies">Ratings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ratings" element={<Ratings />} />
      </Routes>
    </div>
  )


}

export default App;
