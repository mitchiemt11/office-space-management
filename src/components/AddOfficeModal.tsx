import React, { useState } from 'react';

interface AddOfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (office: {
    name: string;
    email: string;
    phone: string;
    address: string;
    capacity: number;
  }) => void;
}

const AddOfficeModal: React.FC<AddOfficeModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    capacity: 0
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      staffMembers: []
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      capacity: 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Office</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Office Name"
                className="w-full p-2 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border rounded-lg"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            
            <div>
              <input
                type="number"
                placeholder="Capacity"
                className="w-full p-2 border rounded-lg"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                required
                min="1"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600"
          >
            Add Office
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOfficeModal;