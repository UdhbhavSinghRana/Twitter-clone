import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { use } from 'react'
import { BiHomeCircle } from 'react-icons/bi';
import { AiOutlineProfile } from 'react-icons/ai';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { FiTwitter } from 'react-icons/fi';

function SideNav() {
    const session = useSession();
    const user = session?.data?.user;
    return (
        <>
            <div className='border-r-2 border-slate-800 w-10reb md:min-h-screen py-4 text-lg md:ml-40 w-full md:w-1/6 '>
                <div className='fixed justify-evenly w-full md:w-fit md:flex-col flex z-10 bg-opacity-10 backdrop-blur-lg top-0 pt-4 '>
                    <div className='flex text-3xl items-center md:pb-5 md:px-2'>
                        <FiTwitter className='md:text-3xl  ' />
                    </div>
                    <ul className='flex md:flex-col text-xl gap-14 md:gap-3'>
                        <li>
                            <Link href='/' className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <BiHomeCircle className='text-3xl' />
                                <div className='hidden md:block'>
                                    Home
                                </div>
                            </Link></li>

                        {user != null && (
                            <li>
                                <div className='flex gap-4 items-center hover:bg-[#1c1f23] p-2 rounded-full'>
                                    <AiOutlineProfile className='text-3xl' />
                                    <div className='hidden md:block'>
                                        Profile
                                    </div>
                                </div>
                            </li>

                        )}
                        {user == null ? (
                            <li className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <button onClick={() => void signIn()} className='flex gap-4'>
                                    <CiLogin className='text-3xl' />
                                    <div className='hidden md:block'>
                                        Log in
                                    </div>
                                </button>
                            </li>

                        ) : (
                            <li className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <button onClick={() => void signOut()} className='flex gap-4'>
                                    <CiLogout className='text-3xl' />
                                    <div className='hidden md:block'>
                                        Log out
                                    </div>
                                </button>
                            </li>

                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideNav