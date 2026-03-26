import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Membership from './pages/Membership';
import AIPlanner from './pages/AIPlanner';
import CalorieCalculator from './pages/CalorieCalculator';
import Supplements from './pages/Supplements';
import HeightWeightChart from './pages/HeightWeightChart';
import HallOfFame from './pages/HallOfFame';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/ai-coach" element={<AIPlanner />} />
            <Route path="/calorie-calculator" element={<CalorieCalculator />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route path="/height-weight-chart" element={<HeightWeightChart />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;