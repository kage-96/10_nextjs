'use client'
import { supabase } from "@/utils/supabase";
import { useState } from "react"
import { Label } from "../_components/Label";
import { Input } from "../_components/Input";
import { Button } from "../_components/Button";
import { useForm } from "react-hook-form";

interface FormValues {
  email:string
  password:string
}

export default function Page(){
  const {register, handleSubmit, reset, formState:{errors}} = useForm<FormValues>()

  const onSubmit = async (data:FormValues) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options:{
        emailRedirectTo:`http:localhost:3001/login`,
      },
    })

    if(error){
      alert('サインアップに失敗しました。')
    }else{
      reset()
      alert('サインアップに成功しました。')
    }

  }

  return(
    <div className="pt-[240px] flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px]">
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
          {...register("email",{required:"必須項目です。"})}
            type="email"
            id="email"
            placeholder="name@company.com"
            />
        </div>
        <div>
          <Label htmlFor="password">パスワード</Label>
          <Input
          {...register('password',{required:'必須項目です。'})}
            type="password"
            id="password"
            placeholder="⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎"
            />
        </div>
        <div>
          <Button type="submit" variant="signup">登録</Button>
        </div>
      </form>
    </div>
  )
}