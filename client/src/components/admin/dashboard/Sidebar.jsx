import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaQuestion
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const navigate = useNavigate();


    return (
        <>
            <div className="md:hidden flex flex-col gap-20 bg-[#2C387A] text-white p-5">
                <FaTachometerAlt
                    className="cursor-pointer"
                    onClick={
                        () => navigate('/admin')
                    }
                />
                <FaQuestion
                    className="cursor-pointer"
                    onClick={
                        () => navigate('/add-faq')
                    }
                />
            </div>
            <aside className={`w-64 bg-[#2C387A] text-white h-full ${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                <nav className="flex flex-col p-4 space-y-2">
                    <p
                        onClick={
                            () => navigate('/admin')
                        }
                        style={{ cursor: 'pointer' }}
                        className="flex items-center py-2 px-3 hover:bg-gray-700 rounded transition duration-300 active:bg-gray-600"
                    >
                        <FaTachometerAlt className="mr-2" /> Dashboard
                    </p>
                    <p
                        onClick={
                            () => navigate('/add-faq')
                        }
                        style={{ cursor: 'pointer' }}
                        className="flex items-center py-2 px-3 hover:bg-gray-700 rounded transition duration-300 active:bg-gray-600"
                    >
                        <FaQuestion className="mr-2" /> Add FAQ
                    </p>

                </nav>
            </aside>
        </>
    );
};

export default Sidebar;