'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";
import { CreateCategoryRequestBody } from "@/app/api/admin/categories/route";

export default function Page(){
  const [name,setName] = useState<string>("")
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(name.trim() === "")return;

    const body:CreateCategoryRequestBody = {name}
    const res = await fetch('/api/admin/categories',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body),
    })

    const {id} = await res.json();

    if(res.status === 200){
      alert('カテゴリーを作成しました。')
      router.replace(`/admin/categories/${id}`);
    }else{
      alert('カテゴリーの作成に失敗しました。')
    }

  }
  return(
    <CategoryForm
      mode='new'
      onSubmit={handleSubmit}
      setName={setName}
      name={name}
     />
  )
}