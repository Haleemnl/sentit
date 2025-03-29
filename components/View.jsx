import React from 'react'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
import Ping from './Ping'

const View = async ({ id }) => {

    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id })

    // the unstable after allows other static contents to load whilst fetching for the dynamic contents
    after(
        async () => {
            await writeClient.patch(id).set({ views: totalViews + 1 }).commit()
        }
    )


    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>

            <p className='view-text'>
                <span className='font-black'>views: {totalViews} </span>
            </p>

        </div>
    )
}

export default View