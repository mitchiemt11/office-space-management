import React from 'react';
import { Link } from 'react-router-dom';
import { Office } from '../types';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
  return (
    <Link to={`/office/${office.id}`}>
      <div className="bg-red-300 rounded-lg shadow mb-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{office.name}</h2>
            <p className="text-sm text-gray-600">
              {office.staffMembers.length} Staff Members in Office
            </p>
          </div>
          <button className="text-blue-500">
            <span className="sr-only">Edit</span>
            ✏️
          </button>
        </div>
        <button className="w-full text-left mt-2 text-gray-500">
          More info ▼
        </button>
      </div>
    </Link>
  );
};

export default OfficeCard;
