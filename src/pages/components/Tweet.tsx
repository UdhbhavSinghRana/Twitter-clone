import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use } from 'react'
import { prisma } from '~/server/db';
import TweetForm from './TweetForm';

function Tweet() {
    const userImage = useSession().data?.user?.image;
    if (!userImage) {
        return <>Loading...</>;
    }
    return (
        <>
            <div className='flex w-2/3  border-r-2 border-b-2 border-slate-800'>
                <div className='p-4 '>
                    <Image alt='image' src={userImage} width={50} height={50} quality={100} className='rounded-full' />
                </div>
                <div className='w-full pt-2'>
                    <TweetForm />
                    <div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Tweet