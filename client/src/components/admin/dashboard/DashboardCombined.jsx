import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import FAQ from '../../FAQ';
import ShowFaq from '../ShowFaq';

// import './index.css';

const DashboardCombined = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {/* <FAQ /> */}
        <ShowFaq  />
      </div>
    </div>
  );
};

export default DashboardCombined;
