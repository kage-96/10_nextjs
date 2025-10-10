'use client'
import { useFetcher } from '@/app/_hooks/useFetcher';
import { Post } from '@/types/Post';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


export default function Page(){
  const {id} = useParams();
  const [thumbnailImageUrl,setThumbnailImageUrl] = useState<string | null>(null)
  const { data, error, isLoading} = useFetcher<{post:Post}>(`/api/posts/${id}`)

  useEffect(() => {
    if(!data?.post?.thumbnailImageKey) return;

      const {data:{publicUrl}} = supabase.storage
      .from('post_thumbnail')
      .getPublicUrl(data.post.thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)

  },[data?.post?.thumbnailImageKey])

  if(isLoading)return <p>Loading...</p>
  if(error) return <p>エラーが発生しました。</p>
  if(!data?.post)return <p>記事が見つかりません。</p>

  return (
    <div className='max-w-[800px] mx-auto m-8 p-2'>
      {thumbnailImageUrl && (
        <Image src={thumbnailImageUrl} alt='' height={400} width={400} />
      )}
      <div className="flex justify-between items-center text-sm my-4">
        <p className="text-gray-500">
          {new Date(data.post.createdAt).toLocaleDateString()}
        </p>
        <ul className="flex font-bold">
          {data.post.postCategories.map((category) => {
            console.log(category)
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
        <p className="mb-4 text-xl font-bold">{data.post.title}</p>
        <p className=''>{data.post.content}</p>
      </div>
    </div>
  )
}

