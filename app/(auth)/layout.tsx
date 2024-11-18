import Image from "next/image"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <section className=" bg-brand p-10 hidden w-1/2 lg:flex  items-center justify-center xl:w-2/5">
                <div className="max-h-[800px] max-w-[430px] flex-col flex justify-center space-y-12">
                    <Image src="/assets/icons/logo-full.svg" height={84} width={164} alt="icon" className="h-auto" />
                    <div className="space-y-5 text-white">
                        <h1 className="h1">Manage your files the best way</h1>
                        <p className="body-1">This is the place where you can store all of your documents</p>
                    </div>
                    <Image src="/assets/images/files.png" height={342} width={342} alt="hello" className="transition-all hover:rotate-2 hover:scale-105" />
                </div>
            </section>
            <section className="flex flex-col flex-1 items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0 ">
                <div className="lg:hidden mb-16">
                    <Image src="assets/icons/logo-full-brand.svg" width={224} height={84} alt="logo" className="h-auto w-[200px] lg:w-[250px]" />
                </div>
                {children}
            </section>
        </div>
    )
}

export default layout
