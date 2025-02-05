import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffice } from '../context/OfficeContext';
import { Office } from '../types';

const OFFICE_COLORS = [
  '#FFC107', 
  '#FFB6A5', 
  '#FF5722', 
  '#795548', 
  '#E6C3E6',
  '#E91E63', 
  '#A5FFD6', 
  '#4CAF50', 
  '#2196F3', 
  '#1976D2', 
  '#673AB7',
];

const AddOffice: React.FC = () => {
  const navigate = useNavigate();
  const { addOffice } = useOffice();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    capacity: '',
    color: OFFICE_COLORS[0],
    staffMembers: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert capacity to number and create office object
    const newOffice: Omit<Office, 'id'> = {
      ...formData,
      capacity: parseInt(formData.capacity),
      staffMembers: []
    };
    
    addOffice(newOffice);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button 
          onClick={() => navigate('/')}
          className="mr-4 text-gray-600"
        >
          ←
        </button>
        <h1 className="text-xl">New Office</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Office Name"
          className="w-full p-3 bg-gray-50 rounded-lg"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Physical Address"
          className="w-full p-3 bg-gray-50 rounded-lg"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 bg-gray-50 rounded-lg"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 bg-gray-50 rounded-lg"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Maximum Capacity"
          className="w-full p-3 bg-gray-50 rounded-lg"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          required
          min="1"
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Office Colour</h2>
          <div className="grid grid-cols-6 gap-4">
            {OFFICE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-10 h-10 rounded-full ${
                  formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-8"
        >
          ADD OFFICE
        </button>
      </form>
    </div>
  );
};

export default AddOffice;