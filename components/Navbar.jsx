import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link'
import React from 'react'
// import { auth, signIn, signOut } from '../auth'

const Navbar = async () => {
    // get session from auth
    const session = await auth()
    // const session = true

    return (
        <header className='py-5 px-3 shadow-md font-work-sans text-black' >

            <nav className='flex items-end justify-between'>

                {/* [1.] logo */}
                <Link href='/'>
                    <img src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                {/* [2.] OPTIONAL nav items rendering if session exists or not*/}
                <div className='flex items-center gap-5'>

                    {session && session?.user ? (


                        // First option if user exists
                        <>
                            <Link href='/startup/create'>
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            {/* the signOut action form, Redirects To home page */}
                            <form action={async () => {
                                'use server'
                                await signOut({ redirectTo: '/' })
                            }}>

                                <button type='submit'>
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>

                            </form>

                            <Link href={`user/${session?.user?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>

                    ) : (

                        // Second option if user does not exists, signIn form using github provider 
                        <>
                            <form action={async () => {
                                'use server'
                                await signIn('github')
                            }}>

                                <button type='submit'> Sign in </button>

                            </form>

                            <span>no user</span>
                        </>

                    )}

                </div>

            </nav>

        </header >
    )
}

export default Navbar