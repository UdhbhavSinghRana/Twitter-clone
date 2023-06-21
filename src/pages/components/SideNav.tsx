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
            <div className='border-r-2 border-slate-800 min-h-screen py-4 text-lg md:ml-40 w-1/6 '>
                <div className='fixed top-0 pt-4'>
                    <div className='flex text-3xl pb-5'>
                        <FiTwitter className='text-3xl' />
                    </div>
                    <ul className='flex flex-col text-xl gap-6'>
                        <li>
                            <Link href='/' className='flex items-center gap-4'>
                                <BiHomeCircle className='text-3xl' />
                                <div>
                                    Home
                                </div>
                            </Link></li>

                        {user != null && (
                            <li>
                                <div className='flex gap-4 items-center'>
                                    <AiOutlineProfile className='text-3xl' />
                                    Profile
                                </div>
                            </li>

                        )}
                        {user == null ? (
                            <li className='flex items-center gap-4'>
                                <CiLogin className='text-3xl' />
                                <button onClick={() => void signIn()}>Log in</button>
                            </li>

                        ) : (
                            <li className='flex items-center gap-4'>
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