
import { AuthformSchema } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"


const formSchema = AuthformSchema("sign-up")
type Props={
    control:Control<z.infer<typeof formSchema>>
    name:FieldPath<z.infer<typeof formSchema>>,
    placeholder:string,
    label:string,
}


const CustomInput = ({control , name,placeholder,label}:Props) => {
  return (
    <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem className="">
                         <div className="shad-form-item ">
                         <FormLabel className="shad-form-label">{label}</FormLabel>
                            <FormControl>
                                <Input className="shad-input" placeholder={placeholder} {...field} />
                            </FormControl>
                         </div>
                            <FormMessage className="shad-from-message" />
                        </FormItem>
                    )}
                />
  )
}

export default CustomInput
