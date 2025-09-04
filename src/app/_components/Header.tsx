import Link from 'next/link'
import React, { FC } from 'react'

export const Header:FC = () => {
  return (
    <header className='header bg-gray-800 font-bold text-white'>
      <nav>
        <ul className='flex item-center justify-between p-6'>
          <li><Link href='/'>Blog</Link></li>
          <li>
            <div>
              <ul className='flex item-center justify-between'>
                <li><Link href="/admin/posts" className='mr-4'>管理画面</Link></li>
                <li><Link href="/">ログアウト</Link></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
