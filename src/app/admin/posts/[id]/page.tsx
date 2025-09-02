'use client'
import { Category } from "@/types/Category";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "../../../_components/Label";
import { Input } from "../../../_components/Input";
import { Textarea } from "../_components/Textarea";
import { Button } from "../../../_components/Button";
import { CategoriesSelect } from "../_components/CategoriesSelect";
import { Post } from "@/types/Post";

export default function Page(){
  const [title,setTitle] = useState<string>("")
  const [content,setContent] = useState<string>("")
  const [thubmnailUrl,setThubmnailUrl] = useState<string>("https://placehold.jp/800x400.png")
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();
  const {id} = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`)
      const {post}:{post:Post} = await res.json();
      setTitle(post.title)
      setContent(post.content)
      setThubmnailUrl(post.thumbnailUrl)
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
      router.push('/admin/posts/')
    }else{
      alert('記事の削除に失敗しました。')
    }

  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(title.trim() === ""){
      return;
    };

    const res = await fetch(`/api/admin/posts/${id}`,{
      'method':'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({title,content,thubmnailUrl,categories}),
    })

    if(res.status === 200){
      router.push(`/admin/posts/${id}`);
      alert('記事を更新しました。')
    }else{
      alert('記事の更新に失敗しました。')
    }

  }
  return(
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">記事編集</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>{/* タイトル */}
          <Label htmlFor="title">タイトル</Label>
          <Input
            id='title'
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value);}}
            />
        </div>

        <div>{/* 内容 */}
          <Label htmlFor="content">内容</Label>
          <Textarea
            rows={5}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div>{/* サムネイル */}
          <Label htmlFor="thubmnail">サムネイルURL</Label>
          <Input id="thubmnail" type="text" value={thubmnailUrl} onChange={(e) => setThubmnailUrl(e.target.value) }  />
        </div>

        <div>{/* カテゴリー */}
          <Label htmlFor="category">カテゴリー</Label>
          <CategoriesSelect
          selectedCategories={categories} 
          setSelectedCategories={setCategories}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* 更新 */}
          <Button
            type='submit'
            variant="post"
            >
              更新
          </Button>

          {/* 削除 */}
          <Button
            type='button'
            variant="delete"
            onClick={handleDelete}
            >
              削除
            </Button>
          </div>
      </form>
    </div>
  )
}