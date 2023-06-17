import React, { use, useEffect } from 'react'

function TweetForm() {
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
            <form className='px-2 w- pt-4 '>
                <textarea
                    placeholder="What's happening?!"
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