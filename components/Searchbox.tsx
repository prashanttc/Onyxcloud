'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GetFile } from '@/lib/actions/file.actions';
import {useDebounce} from "use-debounce";
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import { SearchIcon } from 'lucide-react';

const Searchbox = () => {
  const [query, setQuery] = useState("")
  const searchParam = useSearchParams();
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const searchQuery = searchParam.get("query");
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query,300)

const handleclick =(file:Models.Document)=>{
 setOpen(false);
 setResult([]);
 router.push(`/${file.type === "video"?"media": file.type +"s"}?query=${query}`)
}
  useEffect(() => {
    const fetchFile = async () => {
      if(debouncedQuery.length === 0){
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParam.toString(),""))
      }
      const files = await GetFile({ types:[], searchText: debouncedQuery })
      setResult(files.documents)
      setOpen(true)
    }
    fetchFile();

  }, [debouncedQuery])

  useEffect(() => {
    if (!searchQuery) {
      setQuery("")
    }
  }, [searchQuery])
  return (
    <div className='search'>
      <div className='search-input-wrapper dark:border-[1px] dark:border-white'>
       <SearchIcon/>
        <Input placeholder='Search' value={query} className='search-input' onChange={(e) => setQuery(e.target.value)} />
        {open && (
          <ul className='search-result'>
            {result.length > 0 ? (
              result.map((file) => (
                <li key={file.$id} className='flex items-center ' onClick={()=>handleclick(file)}>
                  <div className='cursor-pointer flex justify-center h-fit items-center gap-4 '>
                    <Thumbnail extension={file.extension} type={file.type} url={file.url} className='size-9 min-w-9' />
                    <p className='subtitle-2 line-clamp-1 text-light-100 dark:text-white'>{file.name}</p>
                  </div>
                </li>
              ))
            ) : <li className='empty-result'> no file found</li>
            }
          </ul>
        )}
      </div>

    </div>
  )
}

export default Searchbox
