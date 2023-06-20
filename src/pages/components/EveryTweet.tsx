import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    name: string | null;
    image: string ;
  } ;
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
      <ul className='flex-row  w-full'>
        <InfiniteScroll
          dataLength={tweets.length}
          next={fetchNewTweets}
          hasMore={false}
          loader={<h4>Loading...</h4>}
        >
          {tweets.map((tweet: Tweet) => (
            <li key={tweet.id} className='p-3 gap-2 py-5 border-b-2 border-r-2 border-slate-800'>
              <div className='flex'>
                <div><img src={tweet.user.image} width={40} height={50} className='rounded-full' /></div>
                <div className='flex-row px-2'>
                  <div className=' font-bold'>{tweet.user.name}</div>
                  <div>{tweet.content}</div>
                </div>
              </div>
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </>
  )
}

export default EveryTweet