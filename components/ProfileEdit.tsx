"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CustomInput from "./CustomInput";
import { AuthformSchema } from "@/lib/utils";
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCurrentUser, SigninUser, UpdateUser } from "@/lib/actions/user.actions";
import { toast } from "@/hooks/use-toast";
import { avatarPlaceholderUrl } from "@/constants";

type Props = {
    type: "edit"
}
const ProfileEdit = ({ type }: Props) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(avatarPlaceholderUrl);
    const [files, setFiles] = useState<File>()

    const formSchema = AuthformSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
        },
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const CurrentUser = await getCurrentUser();
                if (CurrentUser) {
                    form.reset({
                        email: CurrentUser.email || "",
                        fullName: CurrentUser.fullName || "",
                        avatar: CurrentUser.avatar || "",
                    })
                }
            }
            catch (error) {
                console.log("failed to fetch current user", error)
                setErrorMessage("failed to fetch currentuser")
            }
        };
        fetchUser();
    }, [form])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentuser = await getCurrentUser();
                if (currentuser?.avatar) {
                    setAvatarPreview(currentuser.avatar)
                }
            }
            catch (error) {
                console.log("failed to fetch avatar", error)
            }
        }
        fetchUser()
    }, [])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const currentuser = await getCurrentUser()
            const updatedUser = await UpdateUser({
                newName: values.fullName!,
                AccountId: currentuser.$id,
                avatar: files!
            })
            console.log("done")
            toast({
                description: (
                    <p className='body-2 text-white'>
                        user updated successfully!
                    </p>
                ), className: "bg-brand"
            })
            const error = updatedUser.error;
            if (error) {
                setErrorMessage(error)
            }
        } catch (error: any) {
            console.error(error);
            setErrorMessage("Unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleavatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setAvatarPreview(fileUrl)
            setFiles(file)
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" flex flex-col items-center justify-center">
                                <Image
                                    src={avatarPreview}
                                    height={30}
                                    width={100}
                                    alt="Avatar Preview"
                                    className="rounded-full mb-2 object-contain size-20 bg-white/30"
                                />
                            <Input type="file" className="edit-profile-avatar" placeholder="select you avatar" accept="image/*" onChange={(e) => handleavatarChange(e)} />

                        </div>
                    </div>
                    <CustomInput control={form.control} name='fullName' placeholder="enter your fullname" label="fullName" />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem >
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" className="shad-input" {...field} disabled />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-from-message" />
                            </FormItem>
                        )}
                    />

                    <div className="flex  gap-5">
                        <Button className="profile-cancel-button">
                            Cancel
                        </Button>
                        <Button type="submit" className="form-submit-button flex-1" disabled={loading}>
                            Save
                            {loading && (
                                <Image src="/assets/icons/loader.svg" height={24} width={24} alt="" />
                            )}
                        </Button>
                    </div>
                    {errorMessage && <p className="error-message">*{errorMessage}</p>}

                </form>
            </Form>
        </>
    )
}

export default ProfileEdit
