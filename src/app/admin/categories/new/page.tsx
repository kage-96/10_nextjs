'use client'
import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
  const [name,setName] = useState<string>("")
  const [isBlank, setIsBlank] = useState<boolean>(false)
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(name.trim() === ""){
      setIsBlank(true);
      return;
    };

    const res = await fetch('/api/admin/categories',{
      'method':'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name}),
    })
    const {id} = await res.json();

    if(res.status === 200){
      router.push(`/admin/categories/${id}`);
      alert('カテゴリーを作成しました。')
    }else{
      alert('カテゴリーの作成に失敗しました。')
    }

  }
  return(
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">カテゴリー作成</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label htmlFor="category">カテゴリー名</Label>
          <Input
            id='category'
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value); setIsBlank(false) 
              }} />
          {isBlank && <p className="text-red-500">カテゴリーを入力してください。</p>}
        </div>

        <Button type='submit' variant="post">作成</Button>
      </form>
    </div>
  )
}