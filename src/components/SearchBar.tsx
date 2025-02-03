import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search staff members..."
        className="w-full p-2 pl-8 border rounded-lg"
      />
      <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;
