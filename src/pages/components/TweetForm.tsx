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
    <form className='px-2 w-7/12 '>
        <textarea 
        placeholder="What's happening?" 
        className='w-full outline-none h-full bg-transparent resize-none'
        style={{height: 50}} />
    </form>
    </>
  )
}

export default TweetForm