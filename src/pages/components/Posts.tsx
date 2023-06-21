import React from 'react'
import Tweet from './Tweet'
import { useSession } from 'next-auth/react'
import Explore from './Explore';
import { api } from '~/utils/api';

function Posts() {
  const session = useSession();
  
  if (session.status === 'unauthenticated') {
    
    return <Explore />;
  }
  return (
    <>
      <div className='p-3 text-xl font-bold border-r-2 border-b-2 border-slate-800 w-full md:sticky top-0 backdrop-blur-lg z-10 '>
        Home
      </div>
      <Tweet />
    </>
  )
}

export default Posts