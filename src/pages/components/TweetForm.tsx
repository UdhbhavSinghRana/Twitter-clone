import { useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'domain';
import { useSession } from 'next-auth/react';
import React, { FormEvent, use, useEffect } from 'react'
import { prisma } from '~/server/db';
import { api } from '~/utils/api';
import EveryTweet from './EveryTweet';
type data = {
    id: string;
    content: string;
    createdAt: Date;
    user : {
        id: string;
        name: string | null;
        image: string;
    }
    likeCount: number;
    likedByMe: boolean;
}

function TweetForm() {
    const [inputValue, setInputValue] = React.useState('');
    const session = useSession();
    const trpcUtils = api.useContext();
    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }
    else if (session.status !== 'authenticated') {
        return <div>Access Denied</div>;
    }
    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) => {
          console.log(newTweet);
          if (session.status !== 'authenticated') {
            return;
          }
          if (newTweet == undefined) {
            return;
            }
          trpcUtils.tweet.getTweets.setInfiniteData({}, (oldTweets: any ) => {          // old tweets needs to be change to some other type
            if (oldTweets == null || oldTweets.pages[0] == null) return;
            console.log(typeof oldTweets);
            const newCacheTweet = {
                id : newTweet.id,
                content : newTweet.content,
                createdAt : newTweet.createdAt,
                user : {
                    id : session.data.user?.id,
                    name : session.data.user?.name,
                    image : session.data.user?.image,
                },
                likeCount: 0,
                likedByMe: false,
            }
            const updatedData = {
              ...oldTweets,
              pages: [
                {
                  ...oldTweets.pages[0],
                  tweets: [newCacheTweet, ...oldTweets.pages[0].tweets],
                },
                ...oldTweets.pages.slice(1),
              ],
            };
      
            return updatedData;
          });
        },
      });      
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setInputValue('');
        createTweet.mutate({ content: inputValue });
    }
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea?.addEventListener('input', autoResize, false);
        function autoResize(this: any) {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }, [])

    return (
        <>
            <form className='px-2 pt-4 ' onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's happening?!"
                    name="tweet"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='w-11/12 outline-none h-full bg-transparent resize-none border-b-2  border-slate-800 placeholder:text-xl'
                    style={{ height: 50 }} />
                <div className=' translate-x-full border-'>
                    <button className='bg-blue-500 rounded-full px-4  -translate-x-full  py-2  mt-2 text-white font-bold mb-2'>Tweet</button>
                </div>
            </form>
        </>
    )
}

export default TweetForm