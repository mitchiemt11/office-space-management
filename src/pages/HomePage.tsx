import React from 'react';
import { useOffice } from '../context/OfficeContext';
import Layout from '../components/Layout';
import OfficeList from '../components/OfficeList';
import AddOfficeModal from '../components/AddOfficeModal';

const HomePage: React.FC = () => {
  const { offices, addOffice } = useOffice();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const handleAddOffice = (officeData: any) => {
    addOffice({
      ...officeData,
      staffMembers: []
    });
  };

  return (
    <Layout title="All Offices">
      <div className="max-w-md mx-auto relative pb-20">
        <OfficeList offices={offices} />
        
        {/* Fixed Add Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full text-white text-3xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Add Office"
        >
          +
        </button>
        
        <AddOfficeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddOffice}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
