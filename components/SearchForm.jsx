import React from 'react'
import SearchFormReset from './SearchFormReset'
import { SearchIcon } from 'lucide-react'

const SearchForm = ({ query }) => {

    // IN THE SEARCHFORM COMPONENT, destructure the query from your page.js and use it in the SearchForm 

    return (


        <form
            action="/"
            // scroll={false}
            className='search-form'
        >

            <input
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups'
            />

            <div className='flex gap-2'>

                {/* IN HERE, if query exists, then it should show the SearchFormReset button  */}
                {query && <SearchFormReset />}

                <button type='submit' className='search-btn text-white'>
                    <SearchIcon className='size-5' />
                </button>
            </div>

        </form>

    )
}

export default SearchForm