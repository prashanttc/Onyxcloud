"use client";

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from 'next/image'
import { Button } from './ui/button'
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

type Props = {
  email: string,
  accountId: string
}

const OTPModal = ({ email, accountId }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sessionId = await verifySecret({accountId,password});
      if(sessionId) router.push("/")
    }
    catch (error) {
      console.log("something's wrong", error)
      setErrorMessage(true)
      setLoading(false)
    }
  }

  const resendOtp = async () => {
     await sendEmailOTP({email});
     setPassword("")
     setErrorMessage(false)
  }
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
          <AlertDialogHeader className='relative flex justify-center'>
            <AlertDialogTitle className='h2 text-center'>Enter your OTP
              <Image src='/assets/icons/close-dark.svg' alt='' height={20} width={20} className='otp-close-button' onClick={() => setIsOpen(false)} />
            </AlertDialogTitle>
            <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
              we have sent code to <span className='text-brand pl-1'>{email}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot index={0} className='shad-otp-slot' />
              <InputOTPSlot index={1} className='shad-otp-slot' />
              <InputOTPSlot index={2} className='shad-otp-slot' />
              <InputOTPSlot index={3} className='shad-otp-slot' />
              <InputOTPSlot index={4} className='shad-otp-slot' />
              <InputOTPSlot index={5} className='shad-otp-slot' />
            </InputOTPGroup>
          </InputOTP>

          <AlertDialogFooter >
            <div className='flex w-full flex-col gap-4'>
              <AlertDialogAction onClick={handleSubmit} type='button' className='shad-submit-btn h-12 ' >Submit
                {
                  loading && <Image src='/assets/icons/loader.svg' height={20} width={20} alt='' className='ml-2 animate-spin' />
                }
              </AlertDialogAction>
            {errorMessage && <span className='text-red text-center subtitle-2'> wrong otp</span>}
              <div className='subtitle-2 text-center mt-2'>
                Didn't get code? <Button className='pl-1 text-brand' type='button' variant='link' onClick={resendOtp}>Resend code</Button>
              </div>
            </div>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default OTPModal
