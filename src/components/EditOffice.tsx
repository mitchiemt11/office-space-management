import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOffice } from '../context/OfficeContext';
import { Office } from '../types';
import { ArrowLeft, Trash2 } from 'lucide-react';

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

const EditOffice: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { offices, updateOffice, deleteOffice } = useOffice();

  const [formData, setFormData] = useState<Omit<Office, 'id'>>({
    name: '',
    address: '',
    email: '',
    phone: '',
    capacity: 0,
    color: OFFICE_COLORS[0],
    staffMembers: []
  });

  // Get existing office data
  useEffect(() => {
    const office = offices.find(office => office.id === id);
    if (office) {
      setFormData({
        name: office.name,
        address: office.address,
        email: office.email,
        phone: office.phone,
        capacity: office.capacity,
        color: office.color,
        staffMembers: office.staffMembers
      });
    } else {
      navigate('/');
    }
  }, [id, offices, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const updatedOffice: Office = {
      id,
      ...formData,
      capacity: typeof formData.capacity === 'string'
        ? parseInt(formData.capacity)
        : formData.capacity
    };

    updateOffice(updatedOffice);
    navigate('/');
  };

  const handleDelete = () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this office?')) {
      deleteOffice(id);
      navigate('/');
    }
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      setFormData({ ...formData, capacity: parseInt(value) });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center p-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="ml-4 text-xl font-semibold w-full text-center">Edit Office</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-medium"
              style={{ backgroundColor: formData.color }}
            >
              {getInitials(formData.name)}
            </div>
            <input
              type="text"
              placeholder="Office Name"
              className="flex-1 p-3 bg-gray-100 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

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

          <div className="relative">
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded-lg pr-24"
              value={formData.capacity ? `${formData.capacity} Staff Members` : ''}
              onChange={handleCapacityChange}
              onFocus={(e) => {
                // When focused, show only the number
                e.target.value = formData.capacity.toString();
              }}
              onBlur={(e) => {
                // When blurred, append "Staff Members"
                if (formData.capacity) {
                  e.target.value = `${formData.capacity} Staff Members`;
                }
              }}
              required
              min="1"
              placeholder="Staff Members"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Office Colour</h2>
            <div className="grid grid-cols-6 gap-3">
              {OFFICE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-full transition-all ${formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-3 w-3/4 mx-auto">
            <button
              type="submit"
              className="w-full bg-[#489DDA] text-white py-3 px-4 rounded-full font-medium hover:bg-blue-500 transition-colors"
            >
              UPDATE OFFICE
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full text-[#489DDA] py-3 px-4 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              DELETE OFFICE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOffice;