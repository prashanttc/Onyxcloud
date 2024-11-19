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
        setErrorMessage("");
      
        try {
          const userResponse =
            type === "sign-up"
              ? await createAccount({
                  fullName: values.fullName || "",
                  email: values.email,
                })
              : await SigninUser({ email: values.email });
          if (userResponse.success) {
            setAccountId(userResponse.accountId); 
          } else {
            const error = userResponse.error;
            if (error === "user already exists") {
              setErrorMessage("The account already exists. Please sign in.");
            } else if (error === "failed to send OTP!") {
              setErrorMessage("Failed to send OTP. Please try again later.");
            } else if (error ==="user does not exist") {
              setErrorMessage("user does not exist . please create account.");
            } else {
              setErrorMessage("Failed to sign up. Please try again later.");
            }
          }
        } catch (error: any) {
          console.error(error);
          setErrorMessage("Unexpected error occurred. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      

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
