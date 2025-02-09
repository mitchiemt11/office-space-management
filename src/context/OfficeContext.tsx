import React, { createContext, useContext, useState, useEffect } from 'react';
import { Office, OfficeContextType, Staff } from '../types';
import { v4 as uuidv4 } from 'uuid';
import AVATAR1 from '../assets/avatar1.png';
import AVATAR2 from '../assets/avatar2.png';
import AVATAR3 from '../assets/avatar3.png';
import AVATAR4 from '../assets/avatar4.png';
import AVATAR5 from '../assets/avatar5.png';
import AVATAR6 from '../assets/avatar6.png';
import AVATAR7 from '../assets/avatar7.png';

const STORAGE_KEY = 'offices_data';
const DEFAULT_OFFICES: Office[] = [
  {
    id: '1',
    name: 'Specno',
    email: 'info@specno.com',
    phone: '082 364 9864',
    address: '10 Willie Van Schoor Dr, Bo Oakdale, Cape Town, 7530',
    capacity: 25,
    color: '#2196F3',
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
      },
      {
        id: '6',
        firstName: 'Jenner',
        lastName: 'Venter',
        avatarUrl: AVATAR6
      },
      {
        id: '7',
        firstName: 'Jenner',
        lastName: 'Venter',
        avatarUrl: AVATAR7
      }
    ]
  },
];

interface ExtendedOfficeContextType extends OfficeContextType {
  isLoading: boolean;
  error: string | null;
  resetToDefault: () => void;
}

const OfficeContext = createContext<ExtendedOfficeContextType | undefined>(undefined);

// Utility functions for data persistence
const loadFromStorage = (): Office[] | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return null;
  }
};

const saveToStorage = (data: Office[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to storage:', error);
  }
};

export const OfficeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const storedData = loadFromStorage();
        
        if (storedData) {
          setOffices(storedData);
        } else {
          setOffices(DEFAULT_OFFICES);
          saveToStorage(DEFAULT_OFFICES);
        }
      } catch (err) {
        setError('Failed to load office data');
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Save to storage whenever offices change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(offices);
    }
  }, [offices, isLoading]);

  const addOffice = (office: Omit<Office, 'id'>) => {
    try {
      const newOffices = [...offices, { ...office, id: uuidv4() }];
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to add office');
    }
  };

  const updateOffice = (updatedOffice: Office) => {
    try {
      const newOffices = offices.map(office => 
        office.id === updatedOffice.id ? updatedOffice : office
      );
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to update office');
    }
  };

  const deleteOffice = (id: string) => {
    try {
      const newOffices = offices.filter(office => office.id !== id);
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to delete office');
    }
  };

  const addStaffMember = (officeId: string, staff: Omit<Staff, 'id'>) => {
    try {
      const newOffices = offices.map(office => {
        if (office.id === officeId) {
          return {
            ...office,
            staffMembers: [...office.staffMembers, { ...staff, id: uuidv4() }]
          };
        }
        return office;
      });
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to add staff member');
    }
  };

  const updateStaffMember = (officeId: string, updatedStaff: Staff) => {
    try {
      const newOffices = offices.map(office => {
        if (office.id === officeId) {
          return {
            ...office,
            staffMembers: office.staffMembers.map(staff =>
              staff.id === updatedStaff.id ? updatedStaff : staff
            )
          };
        }
        return office;
      });
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to update staff member');
    }
  };

  const deleteStaffMember = (officeId: string, staffId: string) => {
    try {
      const newOffices = offices.map(office => {
        if (office.id === officeId) {
          return {
            ...office,
            staffMembers: office.staffMembers.filter(staff => staff.id !== staffId)
          };
        }
        return office;
      });
      setOffices(newOffices);
    } catch (err) {
      setError('Failed to delete staff member');
    }
  };

  const resetToDefault = () => {
    try {
      setOffices(DEFAULT_OFFICES);
      saveToStorage(DEFAULT_OFFICES);
    } catch (err) {
      setError('Failed to reset data');
    }
  };

  return (
    <OfficeContext.Provider value={{
      offices,
      isLoading,
      error,
      addOffice,
      updateOffice,
      deleteOffice,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
      resetToDefault
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
