'use client'
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Post } from "@/types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){
  const [posts, setPosts] = useState<Post[]>([])
  const {token} = useSupabaseSession();
  
  useEffect(() => {
    if(!token) return;
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts',{
        headers:{
          Authorization: token,
        }
      });
      const {posts} = await res.json()
      setPosts([...posts])
    }
    fetcher();
  },[token])
  
  return(
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <Link href="/admin/posts/new" className="bg-blue-500 text-white rounded font-bold py-2 px-4 hover:bg-blue-700">新規作成</Link>
      </div>
      <ul>
        {posts.map((post) => {
          return(
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`}>
              <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
                <p className="text-xl font-bold">{post.title}</p>
                <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
          )
        })}
      </ul>
    </>
  )
}