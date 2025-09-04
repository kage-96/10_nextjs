'use client'
import { Post } from '@/types/Post';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page(){
  const [post,setPost] = useState<Post | null>(null)
  const {id} = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`)
      const {post} = await res.json();
      setPost(post);
    }
    fetcher()
  },[id])

  if(!post)return <p>記事が見つかりません。</p>

  return (
    <div className='max-w-[800px] mx-auto m-8 p-2'>
      <Image src={post.thumbnailUrl} alt='' height={1000} width={1000} />
      <div className="flex justify-between items-center text-sm my-4">
        <p className="text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <ul className="flex font-bold">
          {post.postCategories.map((category) => {
            return(
              <li
                key={category.category.id}
                className="mr-2 border border-blue-500 py-1 px-2 text-blue-500 rounded-md"
                >
                {category.category.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="p-2">
        <p className="mb-4 text-xl font-bold">{post.title}</p>
        <p className=''>{post.content}</p>
      </div>
    </div>
  )
}

