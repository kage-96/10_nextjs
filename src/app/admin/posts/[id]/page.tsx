'use client'
import { Category } from "@/types/Category";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import { PostForm } from "../_components/PostForm";
import { UpdatePostRequestBody } from "@/app/api/admin/posts/[id]/route";

export default function Page(){
  const [title,setTitle] = useState<string>("")
  const [content,setContent] = useState<string>("")
  const [thumbnailUrl,setThumbnailUrl] = useState<string>("https://placehold.jp/800x400.png")
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();
  const {id} = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`)
      const {post}:{post:Post} = await res.json();
      setTitle(post.title)
      setContent(post.content)
      setThumbnailUrl(post.thumbnailUrl)
      setCategories(post.postCategories.map((pc) => pc.category))
    }
    fetcher();
  },[id])

  const handleDelete = async () => {
    if(!confirm("本当に削除しますか？")) return;

    const res = await fetch(`/api/admin/posts/${id}`,{
      method:"DELETE"
    })
    if(res.status === 200){
      alert('記事を削除しました。')
      router.replace('/admin/posts/')
    }else{
      alert('記事の削除に失敗しました。')
    }

  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(title.trim() === ""){
      return;
    };

    const body:UpdatePostRequestBody = {title,content,thumbnailUrl,categories}
    const res = await fetch(`/api/admin/posts/${id}`,{
      'method':'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body),
    })

    if(res.status === 200){
      router.replace(`/admin/posts/${id}`);
      alert('記事を更新しました。')
    }else{
      alert('記事の更新に失敗しました。')
    }

  }
  return(
    <PostForm
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      categories={categories}
      setCategories={setCategories}
      thumbnailUrl={thumbnailUrl}
      setThumbnailUrl={setThumbnailUrl}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      mode='edit'
    />
  )
}