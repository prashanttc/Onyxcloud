"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator';
import { navItems } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import FileUploader from './FileUploader';
import { SignOutUser } from '@/lib/actions/user.actions';
import { EditIcon, LogOutIcon, MenuIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';


type Props = {
  $id: string;
  avatar: string;
  fullName: string;
  email: string;
  accountId: string
}
const MobileNav = ({ avatar, fullName, accountId, $id: ownerId }: Props) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  return (
    <header className='mobile-header'>
     <Link href="/">
     <Image alt='' src='/assets/icons/newlogo.png' width={180} height={32} className='my-2' />  </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <MenuIcon className='' />
        </SheetTrigger>
        <SheetContent className='shad-sheet px-3 h-screen'>
          <SheetTitle>
            <div className='header-user'>
              <Image src={avatar} height={44} width={44} alt='' className='header-user-avatar' />
              <div className='sm:hidden lg:block flex gap-1'>
                <p className='subtitle-2 capitalize dark:text-white'>{fullName}</p>
              <Link href="user-profile" onClick={()=> setOpen(false)}>
              <EditIcon className='size-4 dark:text-Bdark-100' />
              </Link>
               
                
              </div>
            </div>
            <Separator className='mb-4 bg-light-200/20' />
          </SheetTitle>
          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
              {navItems.map(({ url, icon, name }) => {
                return <Link key={name} href={url} onClick={()=> setOpen(false)}>
                  <li className={cn("mobile-nav-item", pathname === url && "shad-active")}>
                    <Image src={icon} alt={name} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active")} />
                    <p className=''>{name}</p>
                  </li>
                </Link>
              })}
            </ul>
          </nav>
          <Separator className='mb-4 bg-light-200/20' />
          <div className='flex flex-col justify-center items-center w-full  gap-5 pb-5'>
       <div className='bg-brand w-full rounded-3xl uploader-button items-center justify-center flex'>
       <ThemeToggle/>
       </div>
            <div className='bg-brand darK:bg-Bdark-100 w-full rounded-3xl flex items-center justify-start'>
              <FileUploader accountId={accountId} ownerId={ownerId} />
            </div>
            <button type='submit' className='mobile-sign-out-button' onClick={async () => await SignOutUser()}>
              <LogOutIcon className='w-6' />
              <p>Logout</p>
            </button>
          </div>
        </SheetContent>
      </Sheet>

    </header>
  )
}

export default MobileNav