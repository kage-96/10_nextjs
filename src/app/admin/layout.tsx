'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({children}:{children:React.ReactNode}){
  const pathname = usePathname();

  return(
    <>
      <aside className="fixed bg-gray-100 w-[280px] left-0 bottom-0 top-[72px]">
        <ul>
          <li><Link className={`p-4 block hover:bg-blue-100 ${pathname.indexOf('/admin/posts') >= 0 && 'bg-blue-100'}`} href='/admin/posts'>記事一覧</Link></li>
          <li><Link className={`p-4 block hover:bg-blue-100 ${pathname.indexOf('/admin/categories') >= 0  && 'bg-blue-100'}`} href='/admin/categories/'>カテゴリー一覧</Link></li>
        </ul>
      </aside>

      <div className="ml-[280px] p-4">{children}</div>
    </>
  )
}