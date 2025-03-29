import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const StartUpCard = ({ post }) => {

    // Safe destructuring with default values
    const {
        _createdAt,
        views,
        author = {}, // Default empty object if author is null
        title,
        category,
        _id,
        image,
        description
    } = post;

    // Safely get author properties
    const authorId = author?._id;
    const authorName = author?.name;
    const authorImg = author?.image;

    return (
        <li className='startup-card group '>
            <div className='flex-between'>

                <p className=' startup_card_date'>
                    {formatDate(_createdAt)}
                </p>

                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'> {views} </span>
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`user/${authorId}`}>
                        <p className='text-16-medium line-clamp-1'>
                            {authorName}
                        </p>
                    </Link>
                    <Link href={`startup/${_id}`}>
                        <p className='text-26-semibold line-clamp-1'>
                            {title}
                        </p>
                    </Link>
                </div>

                <Link href={`/user/${authorId}`}>
                    <img src={authorImg}
                        alt="placeholder"
                        height={48}
                        width={48}
                        className='rounded-full'
                    />
                </Link>
            </div>

            <Link href={`startup/${_id}`}>
                <p className='startup-card_desc'>
                    {description}
                </p>

                <img src={image} alt="plaeholder" className='startup-card_img' />
            </Link>


            <div className='flex-between gap-3 mt-5'>
                {/* query based on category */}
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>

                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
};

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
)

export default StartUpCard




















