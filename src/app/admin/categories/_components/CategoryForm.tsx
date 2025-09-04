import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";
import { FC } from "react";

interface Props {
  mode: 'new' | 'edit'
  onDelete?:() => void
  onSubmit:(e:React.FormEvent) => void
  setName:(title:string) => void
  name:string
}

export const CategoryForm:FC<Props> = ({mode,onDelete,onSubmit,setName,name}) => {
  return(
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          {mode === 'new'
          ?'カテゴリー作成'
          :'カテゴリー編集'
          }
          </h1>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="category">カテゴリー名</Label>
          <Input id='category' type="text" value={name} onChange={(e) => setName(e.target.value) } />
        </div>

        {
          mode === 'new'
          ?<Button type='submit' variant="post">作成</Button>
          :<div className="flex gap-2">
          <Button type='submit' variant="post">更新</Button>
          <Button onClick={onDelete} type='button' variant='delete'>削除</Button>
        </div>
        }

        
      </form>
    </div>
  )
}