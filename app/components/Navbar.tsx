import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {

    const session = await auth()


    return (
        <header className="bg-slate-50 py-6 px-5 text-black">
            <nav className="flex justify-between items-center ">

                <Link href={'/'}>
                    <Image src={"/logo.png"} alt="Logo" width={144} height={30} />
                </Link>



                <div className="flex items-center gap-6">
                    {
                        session && session?.user ? (
                            <>
                                <Link href={'/startup/create'}>
                                    <span>Create</span>
                                </Link>
                                <form action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: '/' })
                                }}>


                                    <button type="submit">
                                        <span>Log Out</span>
                                    </button>
                                </form>


                                <Link href={`/user/${session?.user?.id}`}>
                                    <span>{session?.user?.name?.split(" ")[0]}</span>
                                </Link>
                            </>

                        ) : (

                            <form action={async () => {
                                "use server"

                                await signIn("github")
                            }}>
                                <button type="submit">
                                    <span>Log In</span>
                                </button>
                            </form>
                        )}
                </div>
            </nav>
        </header >
    )
}

export default Navbar