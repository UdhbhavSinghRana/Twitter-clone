import React from 'react'
import { api } from '~/utils/api'
import { userRouter } from '../../server/api/routers/userRouter';
import { useQuery } from '@tanstack/react-query';
import UserImage from './UserImage';
type UserShow = {
    userName: string | null;
    userImage: string | null;
    userId: string | null;

}

function UsersPage() {
    const getUsers = api.user.getUsers.useQuery({});
    console.log(getUsers.data?.users);
    const allUsers: UserShow[] = getUsers.data?.users.map((user) => {
        return {
            userName: user.name,
            userImage: user.image,
            userId: user.id,
        }
    }) ?? [];
    return (
        <div className='w-full rounded-lg bg-[#16181C]'>
            <h1 className='text-xl font-bold p-2 '>
                Who To follow
            </h1>
            <ul>
                <li>
                    {allUsers?.map((user) => {
                        return (
                            <div className='flex items-center justify-between p-2 hover:bg-[#1c1f23] '>
                                <div className='flex items-center'>
                                    <div className='pr-2'>
                                        <UserImage src={user.userImage} />
                                    </div>
                                    <div className=''>
                                        <div className='text-xl'>
                                            {user.userName}
                                        </div>
                                        <div className='text-xs text-slate-400'>
                                            @{user.userName}
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <button className='bg-slate-200 text-black rounded-xl px-2 py-1'>
                                        Follow
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </li>
            </ul>
        </div>
    )
}

export default UsersPage