import SearchForm from "@/components/SearchForm";
import StartUpCard from "@/components/StartUpCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }) {

  const query = (await searchParams).query
  const params = { search: query || null }

  // post data
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });


  return (
    <>
      <section className="pink_container">
        <h1 className="heading ">Pitch Your Startups, <br /> Connect With Entreprenures</h1>
        <p className="sub-heading !max-w-3xl text-yellow-300"> Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions </p>

        <SearchForm
          query={query}

        />

      </section>


      {/* DYNAMIC RENDERING OF SEARCHED CARDS */}

      < section className="section_container" >

        {/* dynamically render query name if present */}
        <p className="text-30-semibold" >
          {query ? `Search Results For ${query}` : 'All Startups'}
        </p >

        {/* Dynamic card if posts is more than 0 then it should show the startupcard component, else no-result text */}
        <ul className="mt-7 card_grid " >

          {
            posts.length > 0 ? (

              posts.map((post) => (
                <StartUpCard
                  key={post?._id}
                  post={post}
                />
              ))
            ) : (

              <p className="no-results"> No StartUps Found </p>
            )

          }

        </ul >
      </section >


      <SanityLive />
    </>
  );
}




















// const posts = [{
//   _createdAt: new Date(),
//   views: 55,
//   author: { _id: 1, name: 'haleem' },
//   _id: 1,
//   description: 'This is a Description',
//   image: 'https://plus.unsplash.com/premium_photo-1731952275307-416815ca7c8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D',
//   category: 'Robots',
//   title: 'We Robots'
// }]