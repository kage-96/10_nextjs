import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";
import { Textarea } from "./Textarea";
import { CategoriesSelect } from "./CategoriesSelect";
import { Button } from "@/app/_components/Button";
import { Category } from "@/types/Category";
import { FC } from "react";

interface Props {
  mode:'new' | 'edit'
  title:string
  setTitle:(title:string) => void
  content:string
  setContent:(content:string) => void
  categories:Category[]
  setCategories:(categories:Category[]) => void
  thumbnailUrl:string
  setThumbnailUrl: (thubmnailUrl:string) => void
  onDelete?:() => void
  onSubmit:(e:React.FormEvent) => void
}

export const PostForm:FC<Props> = ({mode,title,setTitle,content,setContent,categories,setCategories,thumbnailUrl,setThumbnailUrl,onDelete,onSubmit}) => {
  return(
    <div className="container mx-auto px-4">
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4">
        {
          mode === 'new'
          ?'記事作成'
          :'記事編集'
        }
        
        </h1>
    </div>
    <form onSubmit={onSubmit} className="space-y-4">

      <div>{/* タイトル */}
        <Label htmlFor="title">タイトル</Label>
        <Input
          id='title'
          type="text"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          />
      </div>

      <div>{/* 内容 */}
        <Label htmlFor="content">内容</Label>
        <Textarea
          rows={5}
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        />
      </div>

      <div>{/* サムネイル */}
        <Label htmlFor="thubmnail">サムネイルURL</Label>
        <Input id="thubmnail" type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value) }  />
      </div>

      <div>{/* カテゴリー */}
        <Label htmlFor="category">カテゴリー</Label>
        <CategoriesSelect
        selectedCategories={categories} 
        setSelectedCategories={setCategories}
        />
      </div>

      {
      mode === 'new'
      ?
      <Button type='submit'variant="post">作成</Button>
      :
      <div className="flex items-center gap-2">
        {/* 更新 */}
        <Button
          type='submit'
          variant="post"
          >
            更新
        </Button>

        {/* 削除 */}
        <Button
          type='button'
          variant="delete"
          onClick={onDelete}
          >
            削除
          </Button>
        </div>
        }
    </form>
  </div>
  )
}