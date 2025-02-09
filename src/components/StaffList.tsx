import React, { useState } from 'react';
import { Staff } from '../types';
import StaffMemberCard from './StaffMemberCard';
import SearchBar from './SearchBar';

interface StaffListProps {
  staffMembers: Staff[];
  officeId: string;
}

const StaffList: React.FC<StaffListProps> = ({
  staffMembers,
  officeId,
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
            officeId={officeId}
          />
        ))}
      </div>
    </div>
  );
};

export default StaffList;
