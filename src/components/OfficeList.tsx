import React from 'react';
import { Office } from '../types';
import OfficeCard from './OfficeCard';

interface OfficeListProps {
  offices: Office[];
}

const OfficeList: React.FC<OfficeListProps> = ({ offices }) => {
  return (
    <div>
      {offices.map((office) => (
        <OfficeCard key={office.id} office={office} />
      ))}
    </div>
  );
};

export default OfficeList;
