import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { use } from 'react'
import { BiHomeCircle } from 'react-icons/bi';
import { AiOutlineProfile } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { FiTwitter } from 'react-icons/fi';

function SideNav() {
    const session = useSession();
    const user = session?.data?.user;
    return (
        <>
            <div className='border-r-2 border-grayg-900 min-h-screen px-4 py-4 text-lg md:ml-40 w-1/6 '>
                <div className='flex text-3xl pb-4'>
                    <FiTwitter />
                </div>
                <ul className='flex flex-col text-2xl gap-4'>
                    <li>
                        <Link href='/' className='flex items-center gap-2'>
                            <BiHomeCircle />
                            <div>
                                Home
                            </div>
                        </Link></li>

                    {user != null && (
                        <li>
                            <div className='flex gap-2 items-center'>
                                <AiOutlineProfile />
                                Profile
                            </div>
                        </li>

                    )}
                    {user == null ? (
                        <li>
                            <button onClick={() => void signIn()}>Log in</button>
                        </li>

                    ) : (
                        <li className='flex items-center gap-3'>
                            <CiLogout />
                            <button onClick={() => void signOut()}>Log Out</button>
                        </li>

                    )}
                </ul>
            </div>
        </>
    )
}

export default SideNav