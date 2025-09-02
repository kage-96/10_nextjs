'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "../../../_components/Button";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";

export default function Page(){
  const [name,setName] = useState<string>("")
  const {id} = useParams();
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(name.trim() === ""){
      return;
    };

    const res = await fetch(`/api/admin/categories/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name}),
    })

    if(res.status === 200){ 
      alert('カテゴリーを更新しました。')
      router.push('/admin/categories')
    }else{
      alert('カテゴリーの更新に失敗しました。')
    }

  }

  const handleDelete = async () => {
    if(!confirm("本当に削除しますか？")) return;

    const res = await fetch(`/api/admin/categories/${id}`,{
      method:"DELETE"
    })
    if(res.status === 200){
      alert('カテゴリーを削除しました。')
      router.push('/admin/categories');
    }else{
      alert('カテゴリーの削除に失敗しました。')
    }
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`);
      const {category} = await res.json();
      setName(category.name);
    }
    fetcher();
  },[id])

  return(
      <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">カテゴリー編集</h1>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="category">カテゴリー名</Label>
          <Input id='category' type="text" value={name} onChange={(e) => setName(e.target.value) } />
        </div>

        <div className="flex gap-2">
          <Button type='submit' variant="post">更新</Button>
          <Button onClick={handleDelete} type='button' variant='delete'>削除</Button>
        </div>
      </form>
    </div>
  )
}