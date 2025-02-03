import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ title, children, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600"
            >
              ←
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
