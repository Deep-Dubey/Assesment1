import React from 'react'

const PostCard = ({post}) => {

  function handleClick(){
    alert(post.body);
  }
  return (
    <div className='bg-slate-200 w-[380px] h-[132px] m-4 p-2 text-justify cursor-pointer text-ellipsis line-clamp-5' onClick={handleClick}>
      <div className='font-medium text-center'> {post.title} </div>
      <span> {post.body} </span>
    </div>
  )
}

export default PostCard;
