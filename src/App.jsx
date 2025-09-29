import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App max-w-4xl mx-auto p-2 sm:p-4">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:discordId" element={<Profile />} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
