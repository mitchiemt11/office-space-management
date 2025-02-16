import React, { useState } from 'react';
import { MoreVertical, ArrowLeft, CircleX } from 'lucide-react';
import { Staff } from '../types';
import { useOffice } from '../context/OfficeContext';
import AVATAR1 from '../assets/avatar1.png';
import AVATAR2 from '../assets/avatar2.png';
import AVATAR3 from '../assets/avatar3.png';
import AVATAR4 from '../assets/avatar4.png';
import AVATAR5 from '../assets/avatar5.png';
import AVATAR6 from '../assets/avatar6.png';
import AVATAR7 from '../assets/avatar7.png';
import StepIndicator from './StepIndicator';

interface StaffMemberCardProps {
  staff: Staff;
  officeId: string;
}

const AVATARS = [
  AVATAR1,
  AVATAR2,
  AVATAR3,
  AVATAR4,
  AVATAR5,
  AVATAR6,
  AVATAR7,
];

const StaffMemberCard: React.FC<StaffMemberCardProps> = ({
  staff,
  officeId,
}) => {
  const { updateStaffMember, deleteStaffMember } = useOffice();
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStep, setEditStep] = useState<'info' | 'avatar'>('info');
  const [editForm, setEditForm] = useState({
    firstName: staff.firstName,
    lastName: staff.lastName,
    avatarUrl: staff.avatarUrl
  });

  const handleDeleteClick = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleBackToOptions = () => {
    setIsDeleteModalOpen(false);
    setIsOptionsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsOptionsModalOpen(false);
    setIsEditModalOpen(true);
    setEditStep('info');
  };

  const handleEditSubmit = () => {
    updateStaffMember(officeId, {
      id: staff.id,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      avatarUrl: editForm.avatarUrl
    });
    setIsEditModalOpen(false);
    setEditStep('info');
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditStep('info');
    setEditForm({
      firstName: staff.firstName,
      lastName: staff.lastName,
      avatarUrl: staff.avatarUrl
    });
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
              onClick={handleEditClick}
              className="w-full px-4 py-3 text-center text-white bg-[#489DDA] hover:bg-blue-500 transition-colors rounded-3xl"
            >
              EDIT STAFF MEMBER
            </button> &nbsp;
            <button
              onClick={handleDeleteClick}
              className="w-full px-4 py-3 text-center pt-4 text-[#489DDA] hover:bg-gray-100 transition-colors rounded-3xl"
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

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-lg w-72 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              {editStep === 'avatar' && (
                <button
                  onClick={() => setEditStep('info')}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-2xl font-semibold flex-1 text-center">
                Edit Staff Member
              </h2>
              <button
                onClick={handleCloseEdit}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <CircleX className="w-5 h-5" />
              </button>
            </div>

            {editStep === 'info' ? (
              <div className="p-4">
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="First Name"
                  className="w-full mb-4 p-2 bg-white rounded"
                />
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Last Name"
                  className="w-full mb-4 p-2 bg-white rounded"
                />
                <StepIndicator currentStep={editStep === 'info' ? 0 : 1} className="mb-4" />
                <div className="flex items-center justify-center mb-4 mt-8">
                  <button
                    onClick={() => setEditStep('avatar')}
                    className="w-3/4 px-2 py-3 text-white bg-[#489DDA] hover:bg-blue-500 rounded-3xl transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Avatar</h3>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {AVATARS.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => setEditForm(prev => ({ ...prev, avatarUrl: avatar }))}
                      className={`rounded-full overflow-hidden ${editForm.avatarUrl === avatar ? 'ring-4 ring-slate-700' : ''
                        }`}
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <StepIndicator currentStep={1} className="mb-4" />
                
                <div className="flex items-center justify-center mt-12 mb-4">
                  <button
                    onClick={handleEditSubmit}
                    className="w-7/8 px-2 py-3 text-white bg-[#489DDA] hover:bg-blue-600 rounded-3xl transition-colors"
                  >
                    UPDATE STAFF MEMBER
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            className="fixed inset-0 -z-10"
            onClick={handleCloseEdit}
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
                  deleteStaffMember(officeId, staff.id);
                  setIsDeleteModalOpen(false);
                }}
                className="w-full px-4 py-3 text-center text-white bg-red-500 hover:bg-red-600 rounded-3xl transition-colors"
              >
                DELETE OFFICE
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full px-4 py-3 text-center text-[#489DDA] hover:bg-gray-100 rounded-lg transition-colors"
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