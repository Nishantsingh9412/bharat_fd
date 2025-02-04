import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


import signInImage from '../../../assets/img/sign_in_first.gif';
import { LoginAPI } from '../../../api';

const SignIn = () => {

    const APIURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const googleAuth = () => {
    //     window.open(
    //         `${APIURL}/auth/google/callback`,
    //         "_self"
    //     )
    // }

    const validate = () => {
        if (!email || !password) {
            toast.error('All fields are required');
            return false;
        }
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegEx.test(email)) {
            toast.error('Invalid email address');
            return false;
        }
        return true;
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        const loginData = {
            email: email,
            password: password
        }

        await LoginAPI(loginData).then((res) => {
            console.log("jkjjkjkj", res);
            if (res.data.success) {
                localStorage.setItem('Profile',
                    JSON.stringify({ ...res?.data?.result })
                )
                navigate('/admin');
            } else {
                toast.error(res?.data?.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        })
    }

    // fetch('/path_to_googleAuthController', {
    //     method: 'GET', // or 'POST'
    //     // Additional fetch options...
    // }).then(response => response.json())
    //     .then(data => {
    //         if (data.redirectUrl) {
    //             window.location.href = data.redirectUrl; // Perform the redirection
    //         }
    //     }).catch(error => console.error('Error:', error));


    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* <Toaster /> */}
            <div className="md:w-2/5 w-full p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full bg-white shadow-2xl rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
                        Sign in
                    </h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label className='font-semibold text-lg'>Username or Email</label>
                        <input
                            type="text"
                            value={email}
                            className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className='font-semibold text-lg'>Password</label>
                        <input
                            type="password"
                            value={password}
                            className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="w-full cursor-pointer py-3 mb-2 bg-blue-900 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-700   duration-700 hover:rounded-full"
                            type='submit'
                        >
                            Sign In
                        </button>
                        <button
                            className="w-full cursor-pointer py-3 mb-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-700 duration-700 hover:rounded-full"
                            type="button"
                            onClick={() =>{
                                setEmail('nishantsingh9412ns@gmail.com');
                                setPassword('111111');
                            }}
                        >
                            Test App
                        </button>
                        <div className="text-center">
                            <span className="text-gray-600">Don't have an account?
                                <a href="/signup" className="text-blue-900 ml-2 font-medium hover:underline">Sign Up</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex md:w-3/5 w-full items-center justify-center bg-cover bg-center"
            // style={{ backgroundImage: `url(${pana2})` }}
            >
                <img
                    alt="sign-in image"
                    src={signInImage}
                    className="object-cover w-4/5 h-full rounded-r-lg"
                />
            </div>
        </div>
    );
};

export default SignIn;
