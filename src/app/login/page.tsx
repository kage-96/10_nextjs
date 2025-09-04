'use client';
import React, { useState } from 'react'
import { Input } from './_components/Input'
import { Label } from './_components/Label';

export default function Login(){
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);
  return (
    <div className='flex justify-center pt-[240px]'>
      <form className='space-y-4 w-full max-w-[400px]'>
        <div>
          <Label htmlFor="email" text='メールアドレス' />
          <Input
            type="email"
            id="email"
            value={email}
            isSubmitting={isSubmitting}
            placeholder='name@company.com'
            onChange={(value) => {setEmail(value)}}
          />
        </div>
        <div>
          <Label htmlFor="password" text="パスワード" />
          <Input
            type="password"
            id="password"
            value={password}
            isSubmitting={isSubmitting}
            placeholder='⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎'
            onChange={(value) => {setEmail(value)}}
          />
        </div>
        <div>
          <button type="submit" className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>ログイン</button>
        </div>
      </form>
    </div>
  )
}
