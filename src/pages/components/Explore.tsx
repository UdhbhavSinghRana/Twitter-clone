import React from 'react'
import { api } from '~/utils/api'
import EveryTweet from './EveryTweet';
import { useSession } from 'next-auth/react';
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
};

function Explore() {
    const getTweets  = api.tweet.getTweets.useInfiniteQuery({}, { getNextPageParam: (lastPage) => { lastPage?.nextCursor } })
    if (getTweets.data == undefined) {
        return;
    }
    const tweets: Tweet[] = getTweets.data.pages.flatMap((page) => page?.tweets ?? []).filter((tweet): tweet is Tweet => tweet !== undefined);
    console.log(tweets);
    return (
        <>
            <div className=' md:p-2 md:m-0 m-10 text-xl font-bold border-r-2 border-slate-800 md:w-full md:sticky md:top-0 bg-black md:bg-opacity-10 backdrop-blur-lg md:z-10' >
                Explore 
            </div>
            <div className='w-full h-full'>
                <EveryTweet tweets={tweets}         
                    isError={getTweets.isError}
                    isLoading={getTweets.isLoading}
                    hasMore={getTweets.hasNextPage}
                    fetchNewTweets={getTweets.fetchNextPage} />
            </div>
        </>
    )
}

export default Explore