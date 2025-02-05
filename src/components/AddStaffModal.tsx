import React, { useState } from 'react';
import AVATAR1 from '../assets/avatar1.png';
import AVATAR2 from '../assets/avatar2.png';
import AVATAR3 from '../assets/avatar3.png';
import AVATAR4 from '../assets/avatar4.png';
import AVATAR5 from '../assets/avatar5.png';
import AVATAR6 from '../assets/avatar6.png';
import AVATAR7 from '../assets/avatar7.png';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (firstName: string, lastName: string, avatarUrl: string) => void;
}

const AVATAR_OPTIONS = [
  AVATAR1,
  AVATAR2,
  AVATAR3,
  AVATAR4,
  AVATAR5,
  AVATAR6,
  AVATAR7,
];

const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Staff Member</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Avatar</h3>
          <div className="grid grid-cols-4 gap-4">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`p-2 rounded-lg ${
                  selectedAvatar === avatar ? 'bg-blue-100' : ''
                }`}
              >
                <img src={avatar} alt="Avatar option" className="w-full" />
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            onAdd(firstName, lastName, selectedAvatar);
            onClose();
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Add Staff Member
        </button>
      </div>
    </div>
  );
};

export default AddStaffModal;
