'use client';
import React, { useState } from 'react'
import { Label } from '../_components/Label';
import { Input } from '../_components/Input';
import { Button } from '../_components/Button';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function Login(){
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){
      alert('ログインに失敗しました。')
    }else{
      router.replace('/admin/posts')
    }

  }

  return (
    <div className='flex justify-center pt-[240px]'>
      <form className='space-y-4 w-full max-w-[400px]' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            type="email"
            id="email"
            value={email}
            placeholder='name@company.com'
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div>
          <Label htmlFor="password">パスワード</Label>
          <Input
            type="password"
            id="password"
            value={password}
            placeholder='⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎'
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div>
          <Button type="submit" variant='login'>ログイン</Button>
        </div>
      </form>
    </div>
  )
}
