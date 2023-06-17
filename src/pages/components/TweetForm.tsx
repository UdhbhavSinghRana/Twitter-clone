import { create } from 'domain';
import { useSession } from 'next-auth/react';
import React, { FormEvent, use, useEffect } from 'react'
import { prisma } from '~/server/db';
import { api } from '~/utils/api';


function TweetForm() {
    const [inputValue, setInputValue] = React.useState('');
    const session = useSession();
    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }
    else if (session.status !== 'authenticated') {
        return <div>Access Denied</div>;
    }
    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) => {
            setInputValue('');
            console.log(newTweet);
        }
    });
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
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
            <form className='px-2 w- pt-4 ' onSubmit={handleSubmit}>
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