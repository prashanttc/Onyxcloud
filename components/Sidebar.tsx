'use client';
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props={
  avatar:string;
  fullName:string;
  email:string;
}

const Sidebar = ({avatar,fullName,email}:Props) => {
  const pathname = usePathname()
  return (
    <aside className='sidebar'> 
      <Link href="/"/>
      <Image src="/assets/icons/logo-full-brand.svg" height={50} width={160} alt='logo' className='hidden h-auto lg:block'/>
      <Image src="/assets/icons/logo-brand.svg" height={50} width={160} alt='logo' className='  lg:hidden'/>
      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({url , icon , name})=>{
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
        <Image src={avatar} height={44} width={44} alt='' className='sidebar-user-avatar'/>
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar

