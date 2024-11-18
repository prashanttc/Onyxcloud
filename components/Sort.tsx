
"use client";
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sortTypes } from '@/constants';


const Sort = () => {
  const router= useRouter();
  const path = usePathname();
const handlesort = (value:string)=>{  
  router.push(`${path}?sort=${value}`)
}

  return (
    <Select onValueChange={handlesort} defaultValue={sortTypes[0].value}>
    <SelectTrigger className="sort-select">
      <SelectValue placeholder={sortTypes[0].value}/>
    </SelectTrigger>
    <SelectContent className='sort-select-content'>
     {sortTypes.map((sort)=>(
      <SelectItem value={sort.value} key={sort.label} className='shad-select-item'>{sort.label}</SelectItem>
     ))}
      
    </SelectContent>
  </Select>
  
  )
}

export default Sort

