import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOffice } from '../context/OfficeContext';
import Layout from '../components/Layout';
import StaffList from '../components/StaffList';
import AddStaffModal from '../components/AddStaffModal';
import { Staff } from '../types';

const OfficePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { offices, addStaffMember, deleteStaffMember } = useOffice();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [_, setEditingStaff] = useState<Staff | null>(null);

  const office = offices.find((o) => o.id === id);

  if (!office) {
    return <div>Office not found</div>;
  }

  return (
    <Layout title={office.name} showBack>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="space-y-2">
          <p className="text-gray-600">{office.phone}</p>
          <p className="text-gray-600">{office.email}</p>
          <p className="text-gray-600">Office Capacity: {office.capacity}</p>
          <p className="text-gray-600">{office.address}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Staff Members In Office ({office.staffMembers.length})
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            +
          </button>
        </div>

        <StaffList
          staffMembers={office.staffMembers}
          onEdit={setEditingStaff}
          onDelete={(staffId) => deleteStaffMember(office.id, staffId)}
        />
      </div>

      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(firstName, lastName, avatarUrl) =>
          addStaffMember(office.id, { firstName, lastName, avatarUrl })
        }
      />
    </Layout>
  );
};

export default OfficePage;