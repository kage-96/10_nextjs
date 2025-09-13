'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";
import { UpdateCategoryRequestBody } from "@/app/api/admin/categories/[id]/route";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page(){
  const [name,setName] = useState<string>("")
  const {id} = useParams();
  const router = useRouter();
  const {token} = useSupabaseSession()

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!token) return

    if(name.trim() === ""){
      return;
    };

    const body:UpdateCategoryRequestBody = {name}
    const res = await fetch(`/api/admin/categories/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body:JSON.stringify(body),
    })

    if(res.status === 200){ 
      alert('カテゴリーを更新しました。')
      router.replace('/admin/categories')
    }else{
      alert('カテゴリーの更新に失敗しました。')
    }

  }

  const handleDelete = async () => {
    if(!confirm("本当に削除しますか？")) return;
    if(!token)return

    const res = await fetch(`/api/admin/categories/${id}`,{
      method:"DELETE",
      headers:{
        Authorization: token,
      }
    })
    if(res.status === 200){
      alert('カテゴリーを削除しました。')
      router.replace('/admin/categories');
    }else{
      alert('カテゴリーの削除に失敗しました。')
    }
  }

  useEffect(() => {
    if(!token) return
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`,{
        headers:{
          Authorization: token,
        }
      });
      const {category} = await res.json();
      setName(category.name);
    }
    fetcher();
  },[id,token])

  return(
    <CategoryForm
      mode='edit'
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      setName={setName}
      name={name}
       />
  )
}