'use client'
import { useFetcher } from "@/app/_hooks/useFetcher";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/types/Category";
import Link from "next/link";
import useSWR from "swr";

export default function Page(){
  const {token} = useSupabaseSession()

  const {data, error ,isLoading } = useFetcher<{categories:Category[]}>(
    token ? '/api/admin/categories' : null,
    token
  )

  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>エラーが発生しました</p>
  if (!data?.categories) return <p>カテゴリーがありません</p>

  return(
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">カテゴリー一覧</h1>
        <Link href="/admin/categories/new" className="bg-blue-500 text-white rounded font-bold py-2 px-4 hover:bg-blue-700">新規作成</Link>
      </div>
      <ul>
        {data.categories.map((category) => {
          const date = new Date(category.createdAt);
          return(
          <li key={category.id}>
            <Link href={`/admin/categories/${category.id}`}>
              <div className="border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
                <p className="text-xl font-bold">{category.name}</p>
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