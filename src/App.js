import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Footer from './components/ui/Footer';
import Home from './components/ui/Home';
import Navigation from './components/ui/Navigation';
import Video from './components/ui/Video';

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Router>
        <Navigation />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <Routes>
          <Route path='video/:videoId' element={<Video />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
