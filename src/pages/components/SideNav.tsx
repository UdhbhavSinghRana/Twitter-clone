import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { use } from 'react'

function SideNav() {
    const session = useSession();
    const user = session?.data?.user;
    return (
        <>
            <div className='border-2 min-h-screen px-4 py-4 text-lg'>
                <ul className='flex flex-col'>
                    <li>
                        <Link href='/'>
                            Home
                        </Link></li>

                    {user != null && (
                        <li>
                            <div>Profile</div>
                        </li>

                    )}
                    {user == null ? (
                        <li>
                            <button onClick={() => void signIn()}>Log in</button>
                        </li>
                        
                    ) : (
                        <li>
                            <button onClick={() => void signOut()}>Log Out</button>
                        </li>
                        
                    )}
                </ul>
            </div>
        </>
    )
}

export default SideNav