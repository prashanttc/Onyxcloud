'use client';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { UploadFile } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';
type Props = {
  ownerId: string,
  accountId: string,
  className?: string,
}
const FileUploader = ({ ownerId, accountId, className }: Props) => {

  const { toast } = useToast()
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    const uploadPromise = acceptedFiles.map(async(file)=>{
      if(file.size > MAX_FILE_SIZE){
        setFiles((prevFiles)=> prevFiles.filter((f)=> f.name !== file.name)) ;
        return  toast({
        description: (
          <p className='body-2 text-white'>
            <span className='font-semibold'>
              {file.name}
            </span>id too large. max file sie is 50MB
          </p>
        ),className:"error-toast"
      })
      }
      return UploadFile({file,ownerId,accountId,path}).then((uploadedfiles)=>{
        if(uploadedfiles){
          setFiles((prevFiles)=> prevFiles.filter((f)=> f.name !== file.name)) ; 
        }
      })
    })
    await Promise.all(uploadPromise)
  }, [ownerId,accountId,path])

    const removeFile = (e: React.MouseEvent<HTMLImageElement>, fileName: string) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className='uploader-button '>
        <Image src='/assets/icons/upload.svg' width={24} height={24} alt='uplaod' />
        <p>Upload</p>
      </Button>
      {files.length > 0 && <ul className='uploader-preview-list'>
        <h4 className='h4 text-light-100'>Uploading</h4>
        {files.slice(-5).map((file, index) => {
          const { type, extension } = getFileType(file.name)
          return (
            <li className='uploader-preview-item' key={`${file.name}-${index}`}>
              <div className='flex item-center gap-3'>
                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
                <div className='preview-item-name'>
                  {file.name}
                  <Image src='/assets/icons/file-loader.gif' height={34} width={154} alt='loader' />
                </div>
              </div>
              <Image src='/assets/icons/remove.svg' height={24} width={24} alt='remove' onClick={(e) => removeFile(e, file.name)} />
            </li>
          )
        })}

      </ul>}
    </div>
  )
}

export default FileUploader
