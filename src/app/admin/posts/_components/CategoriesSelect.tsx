import { Category } from "@/types/Category"
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select } from "@mui/material"
import { FC, useEffect, useState } from "react"

interface Props {
  selectedCategories:Category[]
  setSelectedCategories:(categories:Category[]) => void
}

export const CategoriesSelect:FC<Props> = ({selectedCategories,setSelectedCategories}) => {
  const [categories,setCategories] = useState<Category[]>([])

  const handleChange = (value: number[]) => {
    value.forEach((v: number) => {
      const isSelect = selectedCategories.some((c) => c.id === v)
      if (isSelect) {
        setSelectedCategories(selectedCategories.filter((c) => c.id !== v))
        return
      }

      const category = categories.find((c) => c.id === v)
      if (!category) return
      setSelectedCategories([...selectedCategories, category])
    })
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories');
      const {categories} = await res.json();
      setCategories(categories)
    }
    fetcher()
  },[])

  return(
    <FormControl className="w-full">
      <Select
        multiple
        value={selectedCategories}
        onChange={(e) => handleChange((e.target.value as unknown) as number[])}
        input={<OutlinedInput/>}
        renderValue={(selected) => (
          <Box sx={{display:'flex',flexWrap:'wrap',gap:0.5}}>
            {selected.map((value:Category) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
        >
       {categories.map((category) => (
        <MenuItem key={category.id} value={category.id} >
          {category.name}
        </MenuItem>
      ))}
      </Select>
    </FormControl>
  )

}