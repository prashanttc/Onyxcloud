import Image from 'next/image'
import React from 'react'
import Searchbox from './Searchbox'
import FileUploader from './FileUploader'
import { SignOutUser } from '@/lib/actions/user.actions'
import ThemeToggle from './ThemeToggle'


const Header = ({ownerId,accountId}:{ownerId:string; accountId:string})=> {
  return (
   <div className=''>
     <header className='header'>
      <Searchbox />
      <div className='header-wrapper'>
        <FileUploader ownerId={ownerId}  accountId={accountId}/>
        <ThemeToggle/>
        <form action={async () => {
          'use server';
          await SignOutUser()
        }}>
          <button type='submit' className='sign-out-button'>
            <Image src='/assets/icons/logout.svg' height={24} width={24} alt='logout' className='w-6' />
          </button>
        </form>
      </div>
    </header>
   </div>
  )
}

export default Header
