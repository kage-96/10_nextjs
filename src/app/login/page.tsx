'use client';
import React from 'react'
import { Label } from '../_components/Label';
import { Input } from '../_components/Input';
import { Button } from '../_components/Button';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface FormValues {
  email:string
  password:string
}

export default function Login(){

  const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
  const router = useRouter();

  const onSubmit = async (data:FormValues) => {

    const { error } = await supabase.auth.signInWithPassword({
      email:data.email,
      password:data.password,
    })
    if(error){
      alert('ログインに失敗しました。')
    }else{
      router.replace('/admin/posts')
    }

  }

  return (
    <div className='flex justify-center pt-[240px]'>
      <form className='space-y-4 w-full max-w-[400px]' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
          {...register('email',{required:"必須項目です。"})}
            type="email"
            id="email"
            placeholder='name@company.com'
          />
        </div>
        <div>
          <Label htmlFor="password">パスワード</Label>
          <Input
          {...register('password',{required:"必須項目です。"})}
            type="password"
            id="password"
            placeholder='⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎'
          />
        </div>
        <div>
          <Button type="submit" variant='login'>ログイン</Button>
        </div>
      </form>
    </div>
  )
}
