import React, { useState } from 'react';
import { MoreVertical, ArrowLeft } from 'lucide-react';
import { Staff } from '../types';

interface StaffMemberCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffMemberCard: React.FC<StaffMemberCardProps> = ({
  staff,
  onEdit,
  onDelete,
}) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleBackToOptions = () => {
    setIsDeleteModalOpen(false);
    setIsOptionsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 mb-2 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            {staff.avatarUrl ? (
              <img
                src={staff.avatarUrl}
                alt={`${staff.firstName} ${staff.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                {staff.firstName[0]}
                {staff.lastName[0]}
              </div>
            )}
          </div>
          <span className="font-medium text-gray-900">
            {staff.firstName} {staff.lastName}
          </span>
        </div>
        
        <button
          onClick={() => setIsOptionsModalOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {isOptionsModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white py-12 px-8 rounded-lg w-72 overflow-hidden">
            <button
              onClick={() => {
                onEdit(staff);
                setIsOptionsModalOpen(false);
              }}
              className="w-full px-4 py-3 text-center text-white bg-blue-400 hover:bg-blue-500 transition-colors rounded-3xl"
            >
              EDIT STAFF MEMBER
            </button> &nbsp;
            <button
              onClick={handleDeleteClick}
              className="w-full px-4 py-3 text-center pt-4 text-blue-500 hover:bg-gray-100 transition-colors rounded-3xl"
            >
              DELETE STAFF MEMBER
            </button>
          </div>
          
          <div 
            className="fixed inset-0 -z-10" 
            onClick={() => setIsOptionsModalOpen(false)}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-72 overflow-hidden">
            <div className="p-4 flex items-center">
              <button
                onClick={handleBackToOptions}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-center flex-1 font-medium pr-6 ">
                Are You Sure You Want To Delete Staff Member?
              </h2>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <button
                onClick={() => {
                  onDelete(staff.id);
                  setIsDeleteModalOpen(false);
                }}
                className="w-full px-4 py-3 text-center text-white bg-red-500 hover:bg-red-600 rounded-3xl transition-colors"
              >
                DELETE OFFICE
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full px-4 py-3 text-center text-blue-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                KEEP OFFICE
              </button>
            </div>
          </div>
          
          <div 
            className="fixed inset-0 -z-10" 
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default StaffMemberCard;