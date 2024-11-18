"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput";
import { AuthformSchema } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { createAccount, SigninUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type Props = {
    type: "sign-in" | "sign-up"
}


const AuthForm = ({ type }: Props) => {

    const [loading, setLoading] = useState(false);
    const [accountId, setAccountId] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = AuthformSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setErrorMessage("")
        try {

            const user = type === "sign-up" ? await createAccount({
                fullName: values.fullName || "",
                email: values.email
            }) : await SigninUser({ email: values.email })
            setAccountId(user.accountId)
        }
        catch (error: any) {
            console.error(error);   
            if (error.message === "User does not exist") {
                setErrorMessage("The account doesn't exist. Please sign up.");
              } 
            if (error.message === "user already exist") {
                setErrorMessage("The account already exist. Please sign in.");
              } 
              else {
                setErrorMessage("Failed to sign in. Please try again later.");
              }
        }
    
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">{type === "sign-in" ? "Sign-In" : "Sign-Up"}</h1>
                    {type === "sign-up" && <>
                        <CustomInput control={form.control} name='fullName' placeholder="enter your fullname" label="fullName" />
                    </>}
                    <CustomInput control={form.control} name='email' placeholder="enter your email" label="email" />
                    {/* <CustomInput control={form.control} name='password' placeholder="enter your password" label="password" /> */}

                    <Button type="submit" className="form-submit-button" disabled={loading}>
                        {type === "sign-in" ? "sign-in" : "sign-up"}
                        {loading && (
                            <Image src="/assets/icons/loader.svg" height={24} width={24} alt="" />
                        )}
                    </Button>
                    {errorMessage && <p className="error-message">*{errorMessage}</p>}
                    <div className="body-2 flex justify-center">
                        <p className="text-light-100"> {type === "sign-in" ? "don't have an account?" : "already have an account?"}</p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="ml-1 text-brand font-medium">{type === "sign-in" ? "Signup" : "Signin"}</Link>
                    </div>
                </form>
            </Form>
            {accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />}
        </>
    )
}

export default AuthForm
