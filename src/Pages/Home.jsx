import React from 'react';
import { Navbar } from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Sidebar />
    </div>
  );
};