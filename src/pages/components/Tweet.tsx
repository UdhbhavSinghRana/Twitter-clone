import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useEffect } from 'react'
import { prisma } from '~/server/db';
import TweetForm from './TweetForm';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import EveryTweet from './EveryTweet';
type Tweet = {
    id: string;
    content: string;
    createdAt: Date;
}
function Tweet() {
    const userImage = useSession().data?.user?.image;
    const getTweets = api.tweet.getTweets.useInfiniteQuery({}, { getNextPageParam: (lastPage) => { lastPage?.nextCursor } })
    
    if (!userImage) {
        return <>Loading...</>;
    }
    
    const tweets = getTweets.data?.pages.flatMap((page) => page?.tweets) ?? [];
    return (
        <>
            <div className=''>
                <div className='flex w-2/3  border-r-2 border-b-2 border-slate-800'>
                    <div className='p-4 '>
                        <Image alt='image' src={userImage} width={50} height={50} quality={100} className='rounded-full' />
                    </div>
                    <div className='w-full pt-2 flex-row'>
                        <TweetForm />
                    </div>
                </div>
                <div className='w-2/3'> 
                    <EveryTweet tweets={tweets}         // tweets needs to be defined
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