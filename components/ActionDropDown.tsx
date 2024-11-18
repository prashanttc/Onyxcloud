'use client'
import { Models } from 'node-appwrite'
import React, { useState } from 'react'
import { Dialog, DialogFooter } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import Image from 'next/image'
import { actionsDropdownItems } from '@/constants'
import Link from 'next/link'
import { constructDownloadUrl } from '@/lib/utils'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { deleteFile, renameFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'
import { FileDetails } from './ActionDropDownContent'


const ActionDropDown = ({ file }: { file: Models.Document }) => {
    const path = usePathname();
    const [modelOpen, setModelOpen] = useState(false)
    const [action, setAction] = useState<ActionType | null>(null)
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [name, setName] = useState(file.name);
    const [loading, setLoading] = useState(false);

    const allmodelclose = () => {
        setModelOpen(false);
        setDropDownOpen(false);
        setAction(null);
        setName(file.name);
    }

    const handleAction = async ({ }) => {
        if (!action) return;
        setLoading(true);
        let success = false;
        const actions = {
            rename: () => renameFile({ fileId: file.$id, name, extension: file.extension, path }),
            delete:()=> deleteFile({fileId:file.$id,path,bucketFileId:file.bucketFileId})
        }
        success = await actions[action.value as keyof typeof actions]();
        if (success) allmodelclose()
        setLoading(false)
    }
    const renderDialogContent = () => {
        if (!action) return null;
        const { value, label } = action;
        return (
            <DialogContent className='shad-dialog-button'>
                <DialogHeader className='flex flex-col gap-3'>
                    <DialogTitle className='text-center text-light-100'>{label}</DialogTitle>
                    {value === "rename" && (
                        <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    )}
                    {value === "details" && (
                       <FileDetails file={file}/>
                    )}
                    {value === "delete" && (
                     <p className='delete-confirmation'>are you sure you want ot delete <span className='delete-file-name'>{file.name}?</span></p>
                    )}
                </DialogHeader>
                {['rename', 'share', 'delete'].includes(value) && (
                    <DialogFooter className='flex flex-col gap-3 md:flex-row'>
                        <Button onClick={allmodelclose} className='modal-cancel-button'>
                            Cancel
                        </Button>
                        <Button className='modal-submit-button' onClick={handleAction}>{loading && <Image src="/assets/icons/loader.svg" height={24} width={24} alt='loder' className='animate-spin' />}
                            <p className='capitalize'>{value}</p>
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        )
    }


    return (
        <Dialog open={modelOpen} onOpenChange={setModelOpen}>
            <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
                <DropdownMenuTrigger className='shad-no-focus'><Image src='/assets/icons/dots.svg' alt='' width={34} height={34} /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className='max-w-[200px] truncate'>{file.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsDropdownItems.map((actionsitem) => (
                        <DropdownMenuItem key={actionsitem.value} className='shad-dropdown-item' onClick={() => {
                            setAction(actionsitem)
                            if (['rename', 'share', 'delete', 'details'].includes(actionsitem.value)) {
                                setModelOpen(true)
                            }
                        }}>
                            {actionsitem.value === 'download' ? <Link href={constructDownloadUrl(file.bucketFileId)} download={file.name} className='flex items-center gap-2'>
                                <Image src={actionsitem.icon} width={30} height={30} alt={actionsitem.label} />
                                {actionsitem.label}
                            </Link> :
                                <div className='flex items-center gap-2'>
                                    <Image src={actionsitem.icon} width={30} height={30} alt={actionsitem.label} />
                                    {actionsitem.label}
                                </div>
                            }
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {renderDialogContent()}
        </Dialog>

    )
}

export default ActionDropDown
