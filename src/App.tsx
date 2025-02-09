import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OfficeProvider } from './context/OfficeContext';
import HomePage from './pages/HomePage';
import OfficePage from './pages/OfficePage';
import AddOffice from './components/AddOffice';
import EditOffice from './components/EditOffice';

const App = () => {
  return (
    <OfficeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/office/:id" element={<OfficePage />} />
          <Route path="/add-office" element={<AddOffice  />} />
          <Route path="/office/edit/:id" element={<EditOffice />} />
        </Routes>
      </Router>
    </OfficeProvider>
  );
};

export default App;
