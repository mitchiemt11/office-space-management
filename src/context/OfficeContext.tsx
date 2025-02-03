import React, { createContext, useContext, useState } from 'react';
import { Office, OfficeContextType, Staff } from '../types';
import { v4 as uuidv4 } from 'uuid';

const OfficeContext = createContext<OfficeContextType | undefined>(undefined);

export const OfficeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offices, setOffices] = useState<Office[]>([]);

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
