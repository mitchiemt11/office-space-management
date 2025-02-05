import React, { createContext, useContext, useState } from 'react';
import { Office, OfficeContextType, Staff } from '../types';
import { v4 as uuidv4 } from 'uuid';
import AVATAR1 from '../assets/avatar1.png';
import AVATAR2 from '../assets/avatar2.png';
import AVATAR3 from '../assets/avatar3.png';
import AVATAR4 from '../assets/avatar4.png';
import AVATAR5 from '../assets/avatar5.png';
import AVATAR6 from '../assets/avatar6.png';
import AVATAR7 from '../assets/avatar7.png';

const initialOffices: Office[] = [
  {
    id: '1',
    name: 'Specno',
    email: 'info@specno.com',
    phone: '082 364 9864',
    address: '10 Willie Van Schoor Dr, Bo Oakdale, Cape Town, 7530',
    capacity: 25,
    color: '#673AB7',
    staffMembers: [
      {
        id: '1',
        firstName: 'Jacques',
        lastName: 'Jordaan',
        avatarUrl: AVATAR1
      },
      {
        id: '2',
        firstName: 'Daniel',
        lastName: 'Novitzkas',
        avatarUrl: AVATAR2
      },
      {
        id: '3',
        firstName: 'Brandon',
        lastName: 'Watkins',
        avatarUrl: AVATAR3
      },
      {
        id: '4',
        firstName: 'Ryan',
        lastName: 'Duell',
        avatarUrl: AVATAR4
      },
      {
        id: '5',
        firstName: 'Jenner',
        lastName: 'Venter',
        avatarUrl: AVATAR5
      }
    ]
  },
  {
    id: '2',
    name: 'Company Name Here',
    email: 'info@company.com',
    phone: '082 123 4567',
    address: '123 Main Street, Cape Town, 8001',
    capacity: 15,
    color: '#673AB7',
    staffMembers: [
      {
        id: '6',
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: AVATAR6
      },
      {
        id: '7',
        firstName: 'Jane',
        lastName: 'Smith',
        avatarUrl: AVATAR7
      }
    ]
  }
];

const OfficeContext = createContext<OfficeContextType | undefined>(undefined);

export const OfficeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offices, setOffices] = useState<Office[]>(initialOffices);

  const addOffice = (office: Omit<Office, 'id'>) => {
    setOffices([...offices, { ...office, id: uuidv4() }]);
  };

  const updateOffice = (updatedOffice: Office) => {
    setOffices(offices.map(office => 
      office.id === updatedOffice.id ? updatedOffice : office
    ));
  };

  const deleteOffice = (id: string) => {
    setOffices(offices.filter(office => office.id !== id));
  };

  const addStaffMember = (officeId: string, staff: Omit<Staff, 'id'>) => {
    setOffices(offices.map(office => {
      if (office.id === officeId) {
        return {
          ...office,
          staffMembers: [...office.staffMembers, { ...staff, id: uuidv4() }]
        };
      }
      return office;
    }));
  };

  const updateStaffMember = (officeId: string, updatedStaff: Staff) => {
    setOffices(offices.map(office => {
      if (office.id === officeId) {
        return {
          ...office,
          staffMembers: office.staffMembers.map(staff =>
            staff.id === updatedStaff.id ? updatedStaff : staff
          )
        };
      }
      return office;
    }));
  };

  const deleteStaffMember = (officeId: string, staffId: string) => {
    setOffices(offices.map(office => {
      if (office.id === officeId) {
        return {
          ...office,
          staffMembers: office.staffMembers.filter(staff => staff.id !== staffId)
        };
      }
      return office;
    }));
  };

  return (
    <OfficeContext.Provider value={{
      offices,
      addOffice,
      updateOffice,
      deleteOffice,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember
    }}>
      {children}
    </OfficeContext.Provider>
  );
};

export const useOffice = () => {
  const context = useContext(OfficeContext);
  if (context === undefined) {
    throw new Error('useOffice must be used within an OfficeProvider');
  }
  return context;
};
