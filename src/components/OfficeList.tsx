import React from 'react';
import { Office } from '../types';
import OfficeCard from './OfficeCard';

interface OfficeListProps {
  offices: Office[];
}

const OfficeList: React.FC<OfficeListProps> = ({ offices }) => {
  if (offices.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No offices yet. Click the + button to add your first office.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offices.map((office) => (
        <OfficeCard key={office.id} office={office} />
      ))}
    </div>
  );
};

export default OfficeList;
