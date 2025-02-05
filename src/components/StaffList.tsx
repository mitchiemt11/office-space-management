import React, { useState } from 'react';
import { Staff } from '../types';
import StaffMemberCard from './StaffMemberCard';
import SearchBar from './SearchBar';

interface StaffListProps {
  staffMembers: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({
  staffMembers,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staffMembers.filter(
    (staff) =>
      `${staff.firstName} ${staff.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="mt-4">
        {filteredStaff.map((staff) => (
          <StaffMemberCard
            key={staff.id}
            staff={staff}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default StaffList;
