'use client'
import { Category } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostForm } from "../_components/PostForm";
import { CreatePostRequestBody } from "@/app/api/admin/posts/route";

export default function Page(){
  const [title,setTitle] = useState<string>("")
  const [content,setContent] = useState<string>("")
  const [thumbnailUrl,setThumbnailUrl] = useState<string>("https://placehold.jp/800x400.png")
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(title.trim() === ""){
      return;
    };

    const body:CreatePostRequestBody = {title,content,thumbnailUrl,categories}
    const res = await fetch('/api/admin/posts',{
      'method':'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body),
    })
    const {id} = await res.json();

    if(res.status === 200){
      router.replace(`/admin/posts/${id}`);
      alert('記事を作成しました。')
    }else{
      alert('記事の作成に失敗しました。')
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
      onSubmit={handleSubmit}
      mode='new'
    />
  )
}