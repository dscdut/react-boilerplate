import Sidebar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import React from 'react';

interface ILayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<ILayoutMainProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <TopBar />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-auto px-2 py-2 bg-[#F4F4F4]'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutMain;
