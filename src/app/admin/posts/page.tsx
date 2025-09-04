'use client'
import { Post } from "@/types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts');
      const {posts} = await res.json()
      console.log(posts)
      setPosts(posts)
    }
    fetcher();
  },[])
  
  return(
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <Link href="/admin/posts/new" className="bg-blue-500 text-white rounded font-bold py-2 px-4 hover:bg-blue-700">新規作成</Link>
      </div>
      <ul>
        {posts.map((post) => {
          const date = new Date(post.createdAt);
          return(
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`}>
              <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
                <p className="text-xl font-bold">{post.title}</p>
                <p className="text-gray-500">{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
              </div>
            </Link>
          </li>
          )
        })}
      </ul>
    </>
  )
}