import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

    const session = await auth()
    //if user is not authenticated, user will be redirected to home page
    if (!session) {
        redirect('/')
    }

    return (
        <>

            <section className='pink_container !min-h-[230px]'>
                <h1 className='heading'> Submit your Startup</h1>
            </section>

            <StartupForm />
        </>
    )
}

export default page