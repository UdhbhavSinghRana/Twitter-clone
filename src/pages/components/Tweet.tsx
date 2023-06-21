import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useEffect } from 'react'
import { prisma } from '~/server/db';
import TweetForm from './TweetForm';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import EveryTweet from './EveryTweet';
import { get } from 'http';
import UserImag from './UserImage';
import Explore from './Explore';
type Tweet = {
    id: string;
    content: string;
    createdAt: Date;
    user : {
        id: string;
        name: string ;
        image: string ;
    }
    likedByMe: boolean;
    likeCount: number;
} ;           
function Tweet() {
    let userImage = useSession().data?.user?.image;
    const session = useSession();
    const getTweets  = api.tweet.getTweets.useInfiniteQuery({}, { getNextPageParam: (lastPage) => { lastPage?.nextCursor } })
    if (getTweets.data == undefined) {
        return;
    }
    const tweets: Tweet[] = (getTweets.data.pages ?? []).flatMap((page) => page?.tweets ?? []).filter((tweet): tweet is Tweet => tweet !== undefined);
    console.log(tweets);
    return (
        <>
            <div className=''>
                <div className='flex w-2/3  border-r-2 border-b-2 border-slate-800'>
                    <div className='p-4 '>
                        <UserImag src={userImage} />
                    </div>
                    <div className='w-full pt-2 flex-row'>
                        {session.status === 'authenticated' ? <TweetForm /> : null}
                    </div>
                </div>
                <div className='w-2/3 h-full'> 
                    <EveryTweet tweets={tweets}         
                        isError={getTweets.isError}
                        isLoading={getTweets.isLoading}
                        hasMore={getTweets.hasNextPage}
                        fetchNewTweets={getTweets.fetchNextPage} />
                </div>
            </div>
        </>
    )
}

export default Tweet