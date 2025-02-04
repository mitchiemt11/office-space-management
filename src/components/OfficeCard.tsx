import React from 'react';
import { Link } from 'react-router-dom';
import { Office } from '../types';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
  return (
    <Link to={`/office/${office.id}`}>
      <div className="bg-white rounded-lg shadow-sm mb-4 relative overflow-hidden">
        <div className="pl-6 pr-4 py-4 border-l-12 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{office.name}</h2>
              <div className="flex items-center mt-2 gap-2">
                <div className="opacity-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  <strong>{office.staffMembers.length}</strong> Staff Members in Office
                </p>
              </div>
            </div>
            ✏️
          </div>
          <hr className="mt-4 border border-gray-200 " />
          <div className="flex justify-center items-center gap-2 mt-2 text-gray-500">
            More info
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfficeCard;
