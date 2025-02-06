import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffice } from '../context/OfficeContext';
import Layout from '../components/Layout';
import OfficeList from '../components/OfficeList';


const HomePage: React.FC = () => {
  const { offices } = useOffice();
  const navigate = useNavigate();
 
  return (
    <Layout title="All Offices">
      <div className="max-w-md mx-auto relative pb-20">
        <OfficeList offices={offices} />
        
        <button
          onClick={() => navigate('/add-office')}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#0D4477] rounded-full text-white text-3xl flex items-center justify-center shadow-lg hover:bg-[#0D4607] transition-colors"
          aria-label="Add Office"
        >
          +
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
