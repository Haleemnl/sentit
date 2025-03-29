
import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartUpCard from "@/components/StartupCard";

const UserStartups = async ({ id }) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup) => (
                    <StartUpCard
                        key={startup._id}
                        post={startup}
                    />
                ))
            ) : (
                <p className="no-result">No posts yet



                </p>
            )}
        </>
    );
};
export default UserStartups;
