import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { format, formatDistanceToNow } from 'date-fns';
type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    name: string | null;
    image: string;
  };
}
type ListProps = {
  tweets: Tweet[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
};

function EveryTweet({ tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore = false, }: ListProps) {
  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (tweets == null || tweets.length === 0) return <div>No tweets found...</div>;
  return (
    <>
      <ul className='flex-row h-full w-full'>
        <div className='h-full'>
          {tweets.map((tweet: Tweet) => (
            <li key={tweet.id} className='p-3 gap-2 py-5 border-b-2 border-r-2 border-slate-800'>
              <div className='flex'>
                <div className='h-10 w-10'>
                  <img src={tweet.user.image}  className='rounded-full h-10 w-10' />
                </div>
                <div className='flex-row px-2'>
                  <div className='font-bold'>
                    <div>{tweet.user.name} - {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: false, })}</div>
                  </div>
                  <p className='inline-block break-all'>{tweet.content}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </>


  )
}

export default EveryTweet