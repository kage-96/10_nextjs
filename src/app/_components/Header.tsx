'use client'
import Link from 'next/link'
import React, { FC } from 'react'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { supabase } from '@/utils/supabase'

export const Header:FC = () => {

  const { isLoading,session } = useSupabaseSession()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className='header bg-gray-800 font-bold text-white fixed w-full h-18 top-0 left-0'>
      <nav>
        <ul className='flex item-center justify-between p-6'>
          <li><Link href='/'>Blog</Link></li>
          <li>
            <div>
            {!isLoading && (
              <ul className='flex item-center justify-between'>
                {session ? (
                  <>
                    <li><Link href="/admin/posts" className='mr-4'>管理画面</Link></li>
                    <li className='cursor-pointer' onClick={handleLogout}>ログアウト</li>
                  </>
                 )
                 :(
                   <>
                    <li><Link href="/contact" className='mr-4'>お問い合わせ</Link></li>
                    <li><Link href="/login">ログイン</Link></li>
                 </>
                  )}
              </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
