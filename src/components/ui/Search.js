import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { search } from '../../features/filter/filterSlice';

const Search = () => {
    const dispatch = useDispatch();
    const { searchText } = useSelector(state => state.filter)
    const [inputValue, setInputValue] = useState(searchText)

    // Redirect
    const match = useMatch('/');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(search(inputValue))

        // Redirect to Home Page
        if (!match) navigate('/')
    }
    return (
        <>
            <div
                className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200"
            >
                {/* <!-- search --> */}
                <form onSubmit={handleSearch}>
                    <input
                        className="outline-none border-none mr-2"
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </form>
                <img
                    className="inline h-4 cursor-pointer"
                    src="/assets/search.svg"
                    alt="Search"
                    onClick={handleSearch}
                />
            </div>
        </>
    );
};

export default Search;