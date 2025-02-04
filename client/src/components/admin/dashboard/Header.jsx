import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');

    }

    return (
        <nav className="bg-gray-100 border-b-red-700 dark:bg-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://bharatfd.azurewebsites.net/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://res.cloudinary.com/dezifvepx/image/upload/v1738508413/bharatfd_logo_tvqxyl.jpg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <div className=" flex self-center text-2xl font-semibold whitespace-nowrap text-white">
                        <p  className='text-[#2C387A]'>
                            Bharat
                        </p>
                        <p className="text-[#E4803A]">    
                            FD
                        </p>
                    </div>
                </a>
                <div className="relative">
                    <img
                        src="https://picsum.photos/40"
                        alt="User Icon"
                        className="h-10 w-10 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                            <p
                                onClick={
                                    () => {
                                        handleLogout();
                                    }
                                }
                                style={{ cursor: 'pointer' }}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Logout
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;