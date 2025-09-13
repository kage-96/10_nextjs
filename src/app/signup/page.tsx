'use client'
import { supabase } from "@/utils/supabase";
import { useState } from "react"
import { Label } from "../_components/Label";
import { Input } from "../_components/Input";
import { Button } from "../_components/Button";

export default function Page(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:`http:localhost:3001/login`,
      },
    })

    if(error){
      alert('サインアップに失敗しました。')
    }else{
      setEmail('')
      setPassword('')
      alert('サインアップに成功しました。')
    }
  }
  return(
    <div className="pt-[240px] flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[400px]">
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            />
        </div>
        <div>
          <Label htmlFor="password">パスワード</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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