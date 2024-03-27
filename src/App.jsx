import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './navbar';
import Home from './Home';
import Album from './Album';
import Playlist from './Playlist'
import Artist from "./Artist";
import Movie from './Movie';
import Series from "./Series";
import NotFound from "./NotFound";

function App() {
  onclick = e => {
    if(e.target.tagName != 'svg') {
      document.querySelector('.open-nav').style.display = 'block';
      document.querySelector('.navlinks').classList.remove('nav-open');
      document.querySelector('.close-nav').style.display = 'none';
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="album/:id" element={<Album />} />
        <Route path="playlist/:id" element={<Playlist />} />
        <Route path="artist/:id" element={<Artist />} />
        <Route path='movie/:id' element={<Movie />} />
        <Route path='series/:id' element={<Series />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
