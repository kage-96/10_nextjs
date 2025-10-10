'use client'
import { useFetcher } from "@/app/_hooks/useFetcher";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Post } from "@/types/Post";
import Link from "next/link";
import useSWR from "swr";


export default function Page(){
  const {token} = useSupabaseSession();

  const { data, error, isLoading } = useFetcher<{posts:Post[]}>(
    token ? '/api/admin/posts' : null,
    token
  )

  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>エラーが発生しました</p>
  if (!data?.posts) return <p>記事がありません</p>
  
  return(
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <Link href="/admin/posts/new" className="bg-blue-500 text-white rounded font-bold py-2 px-4 hover:bg-blue-700">新規作成</Link>
      </div>
      <ul>
        {data.posts.map((post) => {
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