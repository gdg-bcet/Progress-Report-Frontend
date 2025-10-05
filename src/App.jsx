import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import About from './pages/About';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App max-w-5xl mx-auto p-2 sm:p-4">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:discordId" element={<Profile />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
