'use client'
import { Category } from "@/types/Category";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import { PostForm } from "../_components/PostForm";
import { UpdatePostRequestBody } from "@/app/api/admin/posts/[id]/route";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import useSWR from "swr";
import { useFetcher } from "@/app/_hooks/useFetcher";

export default function Page(){
  const [title,setTitle] = useState<string>("")
  const [content,setContent] = useState<string>("")
  const [thumbnailImageKey,setThumbnailImageKey] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();
  const {id} = useParams();
  const {token} = useSupabaseSession()

  const {data, error, isLoading} = useFetcher<{post:Post}>(
    token ? `/api/admin/posts/${id}` : null,
    token
  )

  useEffect(() => {
    if (data?.post) {
      setTitle(data.post.title)
      setContent(data.post.content)
      setThumbnailImageKey(data.post.thumbnailImageKey)
      setCategories(data.post.postCategories.map((pc) => pc.category))
    }
  }, [data])

    // 読み込み中やエラー処理
  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>エラーが発生しました</p>
  if (!data?.post) return <p>記事が見つかりません</p>


  const handleDelete = async () => {
    if(!token) return;

    if(!confirm("本当に削除しますか？")) return;

    const res = await fetch(`/api/admin/posts/${id}`,{
      method:"DELETE",
      headers:{
        Authorization: token,
      }
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
    if(!token) return;

    if(title.trim() === ""){
      return;
    };

    const body:UpdatePostRequestBody = {title,content,thumbnailImageKey,categories}
    const res = await fetch(`/api/admin/posts/${id}`,{
      'method':'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: token,
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
      thumbnailImageKey={thumbnailImageKey}
      setThumbnailImageKey={setThumbnailImageKey}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      mode='edit'
    />
  )
}