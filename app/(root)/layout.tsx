import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"

export const dynamic = 'force-dynamic'
const layout = async({ children }: { children: React.ReactNode }) => {

  const CurrentUser  =await getCurrentUser();
  if(!CurrentUser) return redirect("/sign-in")
  return (
    <main className='flex h-screen'>
      <Sidebar avatar={CurrentUser.avatar} fullName={CurrentUser.fullName} email={CurrentUser.email} />
      <section className='flex flex-col flex-1 h-full'>
        <MobileNav {...CurrentUser} accountId={CurrentUser.accountId}   />
        <Header ownerId={CurrentUser.$id} accountId={CurrentUser.accountId} />
        <div className='main-content'>{children}</div>
      </section>
      <Toaster/>
    </main>
  )
}

export default layout
