import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => (
  <div className="min-h-screen bg-gray-50">

    <Navbar />
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
