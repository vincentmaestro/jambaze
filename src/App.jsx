import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
  const spConfig = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'grant_type=client_credentials&client_id=b14bea6109a141b8b15e857c903a7ef5&client_secret=1ff3731d1226404e8d4aed9d07bc4b87'
  }

  onclick = e => {
    if(e.target.tagName != 'svg') {
      document.querySelector('.open-nav').style.display = 'block';
      document.querySelector('.navlinks').classList.remove('nav-open');
      document.querySelector('.close-nav').style.display = 'none';
    }
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home spotifyConfig = {spConfig}/>} />
          <Route path="album/:id" element={<Album spotifyConfig = {spConfig} />} />
          <Route path="playlist/:id" element={<Playlist spotifyConfig = {spConfig} />} />
          <Route path="artist/:id" element={<Artist spotifyConfig = {spConfig} />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='series/:id' element={<Series />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
