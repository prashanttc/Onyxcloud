'use client';
import {  navItems } from '@/constants'
import { cn } from '@/lib/utils';
import { Edit2Icon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  avatar: string;
  fullName: string;
  email: string;
}

const Sidebar = ({ avatar, fullName, email }: Props) => {
  const pathname = usePathname()
  return (
    <aside className='sidebar'>
      <Link href="/" />
      <Image src="/assets/icons/newlogo.png" height={50} width={260} alt='logo' className=' ml-3 h-auto hidden lg:block ' />
      <Image src="/assets/icons/newlogo.png" height={50} width={260} alt='logo' className=' h-auto lg:hidden  ' />
      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ url, icon, name }) => {
            return <Link key={name} href={url}>
              <li className={cn("sidebar-nav-item", pathname === url && "shad-active")}>
                <Image src={icon} alt={name} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active")} />
                <p className='lg:block hidden'>{name}</p>
              </li>
            </Link>
          })}
        </ul>
      </nav>
      {/* <Image src='/assets/images/files-2.png' height={408} width={406} alt='' className='w-[60%]'/> */}
      <div className='sidebar-user-info'>
        <Image src={avatar} height={44} width={44} alt='' className='sidebar-user-avatar' />
        <div className="hidden lg:flex gap-10">
        <div className=''>
        <p className="subtitle-2 capitalize dark:text-white mb-2">{fullName}</p>
        <p className=" capitalize dark:text-white/80 text-xs w-20">{email}</p>
        </div>
          <Link href='user-profile'>     
              <Edit2Icon className='dark:text-brand size-5' />
              </Link>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar

