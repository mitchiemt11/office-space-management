import React from 'react';
import { useOffice } from '../context/OfficeContext';
import Layout from '../components/Layout';
import OfficeList from '../components/OfficeList';

const HomePage: React.FC = () => {
  const { offices } = useOffice();

  return (
    <Layout title="All Offices">
      <OfficeList offices={offices} />
    </Layout>
  );
};

export default HomePage;
