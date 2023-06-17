import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use } from 'react'
import { prisma } from '~/server/db';
type User = {
    name: string | null;
    email: string | null;
    image: string | null;
    id: string;
};

// const getUser = async (): Promise<User | null> => {

//     const userId = useSession().data?.user?.id; // Assuming this is a valid function call

//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: userId,
//             },
//         });

//         return user;
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
// };

function Tweet() {
    const userImage =  useSession().data?.user?.image;
    if (!userImage) {
        return <>Loading...</>;
    }
    return (
        <div className='p-4'>
            <Image alt='image' src={userImage} width={50} height={50} quality={100} className='rounded-full'/>
        </div>
    )
}

export default Tweet