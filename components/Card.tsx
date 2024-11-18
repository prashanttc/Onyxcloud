import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import FormatedDate from './FormatedDate'
import ActionDropDown from './ActionDropDown'

const Card = ({ file }: { file: Models.Document }) => {
    return (
        <Link href={file.url} target='_blank' className='file-card'>
            <div className='flex justify-between'>
                <Thumbnail url={file.url} type={file.type} extension={file.extension} className='!size-20' imageclassName='!size-11' />
                <div className='flex flex-col items-end justify-between'>
                    <ActionDropDown file={file}/>
                    <p className='body-1'>{convertFileSize(file.size)}</p>
                </div>
            </div>
            <div className='file-card-details'>
                <p className='subtitle-2 line-clamp-1'>{file.name}</p>
                <FormatedDate date={file.$createdAt} className='body-2 text-light-100' />
             <p className='line-clamp-1 text-light-200 caption'>
             By: {file.owner.fullName}
             </p>
            </div>
        </Link>
    )
}

export default Card
