export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface Office {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  capacity: number;
  color: string;
  staffMembers: Staff[];
}

export interface OfficeContextType {
  offices: Office[];
  addOffice: (office: Omit<Office, 'id'>) => void;
  updateOffice: (office: Office) => void;
  deleteOffice: (id: string) => void;
  addStaffMember: (officeId: string, staff: Omit<Staff, 'id'>) => void;
  updateStaffMember: (officeId: string, staff: Staff) => void;
  deleteStaffMember: (officeId: string, staffId: string) => void;
}

