import React from 'react';
import { Pencil, Mail, Phone, UsersRound, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Office } from '../types';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link click propagation
    navigate(`/office/edit/${office.id}`);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg shadow-sm mb-4 relative overflow-hidden"
        style={{ borderLeft: `12px solid ${office.color}` }}
      >
        <div className="pl-6 pr-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to={`/office/${office.id}`} className="text-2xl font-semibold text-gray-800 hover:text-gray-500 transition-colors cursor-pointer">
                {office.name}
              </Link>
              <div className="flex items-center mt-2 gap-2">
                <UsersRound className="w-5 h-5 text-blue-900" />
                <p className="text-gray-500 text-base">
                  <strong>{office.staffMembers.length}</strong> Staff Members in Office
                </p>
              </div>
            </div>
            <button 
              onClick={handleEdit}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
              aria-label="Edit office"
            >
              <Pencil className="text-slate-600 w-5 h-5 group-hover:text-slate-700 transition-colors cursor-pointer" />
            </button>
          </div>
          <hr className="mt-4 border border-gray-200" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-center items-center gap-2 mt-2 text-gray-500 text-sm hover:text-gray-400 transition-colors py-1 cursor-pointer"
          >
            {isExpanded ? 'Less info' : 'More info'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isExpanded && (
            <div className="mt-4 space-y-4 text-gray-600 text-sm">
              <div className="flex items-center gap-3 transition-colors">
                <Phone className="w-5 h-5 text-blue-900" />
                <span>{office.phone}</span>
              </div>
              <div className="flex items-center gap-3 transition-colors">
                <Mail className="w-5 h-5 text-blue-900" />
                <span>{office.email}</span>
              </div>
              <div className="flex items-center gap-3 transition-colors">
                <UsersRound className="w-5 h-5 text-blue-900" />
                <span>Office Capacity: {office.capacity}</span>
              </div>
              <div className="flex items-center gap-3 transition-colors">
                <MapPin className="w-6 h-6 text-blue-900" />
                <span>{office.address}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;
