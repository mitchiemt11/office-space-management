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
    
    const newOffice: Omit<Office, 'id'> = {
      ...formData,
      capacity: parseInt(formData.capacity),
      color: formData.color,
      staffMembers: []
    };
    
    addOffice(newOffice);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center border-b pb-4">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 text-gray-600"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold">New Office</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Office Name"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Physical Address"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Maximum Capacity"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            required
            min="1"
          />

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Office Colour</h2>
            <div className="grid grid-cols-6 gap-2">
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
            <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-3/4 bg-blue-400 text-white py-3 rounded-3xl mt-4 font-medium hover:bg-blue-600 transition"
          >
            ADD OFFICE
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffice;
