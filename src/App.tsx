// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OfficeProvider } from './context/OfficeContext';
import HomePage from './pages/HomePage';
import OfficePage from './pages/OfficePage';

const App = () => {
  return (
    <OfficeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/office/:id" element={<OfficePage />} />
          </Routes>
        </div>
      </Router>
    </OfficeProvider>
  );
};

export default App;
