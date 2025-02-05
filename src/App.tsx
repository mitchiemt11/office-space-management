import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OfficeProvider, useOffice } from './context/OfficeContext';
import HomePage from './pages/HomePage';
import OfficePage from './pages/OfficePage';
import AddOffice from './components/AddOffice';

const App = () => {
  return (
    <OfficeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/office/:id" element={<OfficePage />} />
          <Route path="/add-office" element={<AddOffice onAdd={(office) => {
            // Handle adding office through context
            const { addOffice } = useOffice();
            addOffice({
              ...office,
              staffMembers: [],
              capacity: Number(office.capacity),
            });
          }} />} />
        </Routes>
      </Router>
    </OfficeProvider>
  );
};

export default App;
