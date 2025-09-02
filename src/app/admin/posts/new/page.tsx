'use client'
import { Category } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../../../_components/Label";
import { Input } from "../../../_components/Input";
import { Textarea } from "../_components/Textarea";
import { Button } from "../../../_components/Button";
import { CategoriesSelect } from "../_components/CategoriesSelect";

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

    const res = await fetch('/api/admin/posts',{
      'method':'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({title,content,thumbnailUrl,categories}),
    })
    const {id} = await res.json();

    if(res.status === 200){
      router.push(`/admin/posts/${id}`);
      alert('記事を作成しました。')
    }else{
      alert('記事の作成に失敗しました。')
    }

  }

  return(
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">記事作成</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id='title'
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value);}}
            />
        </div>

        <div>
          <Label htmlFor="content">内容</Label>
          <Textarea
            rows={5}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div>
          <Label htmlFor="thubmnail">サムネイルURL</Label>
          <Input id="thubmnail" type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value) }  />
        </div>

        <div>
          <Label htmlFor="category">カテゴリー</Label>
          <CategoriesSelect
          selectedCategories={categories} 
          setSelectedCategories={setCategories}
          />
        </div>

        <Button type='submit'variant="post">
          作成
        </Button>
      </form>
    </div>
  )
}