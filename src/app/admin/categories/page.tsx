'use client'
import { Category } from "@/types/Category";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories');
      const {categories} = await res.json()
      setCategories(categories)
    }
    fetcher();
  },[])
  if(categories.length === 0) return <p>まだカテゴリーがありません。</p>
  return(
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">カテゴリー一覧</h1>
        <Link href="/admin/categories/new" className="bg-blue-500 text-white rounded font-bold py-2 px-4 hover:bg-blue-700">新規作成</Link>
      </div>
      <ul>
        {categories.map((category) => {
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