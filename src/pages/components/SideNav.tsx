import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { use } from 'react'
import { BiHomeCircle } from 'react-icons/bi';
import { AiOutlineProfile } from 'react-icons/ai';
import { CiLogin, CiLogout } from 'react-icons/ci';
import {  FiTwitter } from 'react-icons/fi';

function SideNav() {
    const session = useSession();
    const user = session?.data?.user;
    return (
        <>
            <div className='border-r-2 border-slate-800 w-10reb md:min-h-screen py-4 text-lg md:ml-40 md:w-1/6 '>
                <div className='fixed top-0 pt-4 '>
                    <div className='flex text-3xl pb-5 px-2'>
                        <FiTwitter className='text-3xl ' />
                    </div>
                    <ul className='flex flex-col text-xl gap-3'>
                        <li>
                            <Link href='/' className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <BiHomeCircle className='text-3xl' />
                                <div>
                                    Home
                                </div>
                            </Link></li>

                        {user != null && (
                            <li>
                                <div className='flex gap-4 items-center hover:bg-[#1c1f23] p-2 rounded-full'>
                                    <AiOutlineProfile className='text-3xl' />
                                    Profile
                                </div>
                            </li>

                        )}
                        {user == null ? (
                            <li className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <CiLogin className='text-3xl' />
                                <button onClick={() => void signIn()}>Log in</button>
                            </li>

                        ) : (
                            <li className='flex items-center gap-4 hover:bg-[#1c1f23] p-2 rounded-full'>
                                <CiLogout className='text-3xl' />
                                <button onClick={() => void signOut()}>Log Out</button>
                            </li>

                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideNav