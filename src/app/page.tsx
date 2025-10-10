'use client'
import { Post } from "@/types/Post"
import Link from "next/link"
import classes from './styles/post.module.css'
import { useFetcher } from "./_hooks/useFetcher"

export default function Home(){
  const {data, error, isLoading} = useFetcher<{posts:Post[]}>('/api/posts')

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラーが発生しました。</p>
  if(!data?.posts) return <p>記事がありません。</p>

  return(
    <div className="mx-auto mt-8 max-w-[800px] p-2">
      <ul>
        {data.posts.map((post) => {
          const date = new Date(post.createdAt)
          return(
            <li key={post.id} className="mb-4">
              <Link href={`/posts/${post.id}`}>
                <div className="border p-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <p className="text-gray-500">
                      {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
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
                  <div className="">
                    <p className="mb-8 text-xl font-bold">{post.title}</p>
                    <p className={classes.content}>{post.content}</p>
                  </div>
                </div>
              </Link>
            </li>  
          )
        })}
      </ul>
    </div>
  )
}