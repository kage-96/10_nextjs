'use client'
import { Post } from "@/types/Post"
import Link from "next/link"
import { useEffect, useState } from "react"
import classes from './styles/post.module.css'

export default function Home(){
  const [posts,setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts',{
        method:"GET"
      })
      const {posts}:{posts:Post[]} = await res.json();
      setPosts(posts)
    }
    fetcher()
  },[])

  return(
    <div className="mx-auto mt-8 max-w-[800px] p-2">
      <ul>
        {posts.map((post) => {
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