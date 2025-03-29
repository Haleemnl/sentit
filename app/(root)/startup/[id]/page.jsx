import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'


export const experimental_ppr = true

const page = async ({ params }) => {
    const id = (await params).id

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
    if (!post) return notFound()

    const md = markdownit()
    const parsedContent = md.render(post?.pitch || '');

    return (
        <>

            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container'>

                <img
                    src={post.image}
                    alt="thumbnail"
                    className='w-full h-auto rounded-xl'
                />

                <div className='mx-auto space-y-5 mt-10 max-w-4xl'>

                    <div className='flex-between gap-5'>
                        {post.author && (  // Check if author exists
                            <Link href={`/user/${post.author._id}`}>
                                {post.author.image && (  // Check if image exists
                                    <Image
                                        src={post.author.image}
                                        alt='profile picture'
                                        width={64}
                                        height={64}
                                        className='rounded-full drop-shadow-lg'
                                    />
                                )}
                                <div>
                                    <p className='text-20-medium'>
                                        {post.author.name || 'Anonymous'}  {/* Fallback if name is null */}
                                    </p>
                                    <p className='text-16-medium !text-black-300'>
                                        @{post.author.username || 'anonymous'}  {/* Fallback if username is null */}
                                    </p>
                                </div>
                            </Link>
                        )}
                        {post.category && (  // Check if category exists
                            <p className='category-tag'>{post.category}</p>
                        )}
                    </div>

                    {/* pitch articles */}
                    <h3 className='text-30-bold'>Pitch Details</h3>

                    {parsedContent ? (
                        <article
                            className='prose max-w-4xl break-all'
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className='no-result'>No details provided</p>
                    )}

                </div>
                <hr className='divider' />

                {/* todo: editor selected startup */}


                {/* to render dynamically  */}
                <Suspense fallback={<Skeleton className='view-skeleton' />}>
                    {/* id of the post */}
                    <View
                        id={id}
                    />
                </Suspense>
            </section>
        </>
    )
}

export default page