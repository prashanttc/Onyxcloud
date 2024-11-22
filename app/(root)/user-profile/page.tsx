import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import ProfileEdit from '@/components/ProfileEdit'
  

const userprofile = () => {
  return (
    <Card className='h-fit w-full flex flex-col  '>
    <CardHeader>
      <CardTitle className='text-center h1 text-brand mb-3'>user profile</CardTitle>
      <CardDescription className='text-center'>edit your profile</CardDescription>
    </CardHeader>
 <CardContent className='flex flex-col items-center'>
    <ProfileEdit type='edit'/>
 </CardContent>
  </Card>
  
  )
}

export default userprofile
