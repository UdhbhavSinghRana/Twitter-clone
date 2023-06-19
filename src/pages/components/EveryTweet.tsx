import React from 'react'
type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
}
function EveryTweet({tweets}: {tweets: Tweet}) {
  console.log(tweets);
  return (  
    <ul>
      
    </ul>
  )
}

export default EveryTweet