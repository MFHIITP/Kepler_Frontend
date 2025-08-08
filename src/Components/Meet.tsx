import React, { useState } from 'react';
import { Video, Users, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Meet(props) {
    const [username, setUsername] = useState(props?.details?.name || 'John Doe');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/jms_meet/${roomId}/${username}`)
    };

    const isFormValid = username.trim() && roomId.trim();

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className='relative w-full max-w-md'>
                {/* Main Card */}
                <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 p-8 relative overflow-hidden'>
                    {/* Card decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>
                    
                    {/* Header Section */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
                            <Video className='w-8 h-8 text-white' />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                            Join Meeting
                        </h1>
                        <p className='text-sm text-gray-600 font-medium tracking-wide'>
                            KEPLER • WHERE ASPIRATION MEETS ACHIEVEMENT
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className='space-y-6'>
                        {/* Username Field */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Username
                            </label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled
                                    className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
                                    placeholder='Enter your username'
                                />
                                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                    <Shield className='w-4 h-4 text-gray-400' />
                                </div>
                            </div>
                        </div>

                        {/* Room ID Field */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Meeting Room ID
                            </label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    required
                                    className='w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300'
                                    placeholder='Enter room ID'
                                />
                                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                    <Users className='w-4 h-4 text-gray-400' />
                                </div>
                            </div>
                        </div>

                        {/* Join Button */}
                        <button
                            onClick={handleClick}
                            disabled={!isFormValid}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform relative overflow-hidden group ${
                                isFormValid
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98]'
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <div className='flex items-center justify-center space-x-2'>
                                {isFormValid && (
                                    <Zap className='w-5 h-5 group-hover:animate-pulse' />
                                )}
                                <span className='text-sm font-bold tracking-wide'>
                                    {isFormValid ? 'JOIN MEETING' : 'ENTER ROOM ID TO CONTINUE'}
                                </span>
                            </div>
                            
                            {/* Button shine effect */}
                            {isFormValid && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className='mt-8 pt-6 border-t border-gray-100'>
                        <div className='flex items-center justify-center space-x-4 text-xs text-gray-500'>
                            <span className='flex items-center space-x-1'>
                                <Shield className='w-3 h-3' />
                                <span>Secure</span>
                            </span>
                            <div className='w-1 h-1 bg-gray-300 rounded-full'></div>
                            <span className='flex items-center space-x-1'>
                                <Zap className='w-3 h-3' />
                                <span>HD Quality</span>
                            </span>
                            <div className='w-1 h-1 bg-gray-300 rounded-full'></div>
                            <span>Enterprise Grade</span>
                        </div>
                    </div>
                </div>

                {/* Bottom accent */}
                <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-60'></div>
            </div>
        </div>
    );
}

export default Meet;