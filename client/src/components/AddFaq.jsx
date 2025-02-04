import React, { useState } from 'react';

import Header from './admin/dashboard/Header';
import Sidebar from './admin/dashboard/Sidebar';
import FaqOps from './FaqOps';  


const AddFaQ = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <FaqOps />
            </div>
        </div>
    );
};

export default AddFaQ;
