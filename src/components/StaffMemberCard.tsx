import React from 'react';
import { Staff } from '../types';

interface StaffMemberCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffMemberCard: React.FC<StaffMemberCardProps> = ({
  staff,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-2 rounded-lg">
      <div className="flex items-center">
        <img
          src={staff.avatarUrl}
          alt={`${staff.firstName} ${staff.lastName}`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-medium">
          {staff.firstName} {staff.lastName}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onEdit(staff);
        }}
        className="text-gray-600"
      >
        ⋮
      </button>
    </div>
  );
};

export default StaffMemberCard;
