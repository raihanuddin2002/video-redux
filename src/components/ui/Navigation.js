import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Navigation = () => {
    return (
        <>
            {/* <!-- navigation --> */}
            <nav className="bg-slate-100 shadow-md">
                <div
                    className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3"
                >
                    <Link to="/">
                        {/* <img
                            className="h-10"
                            src="/assets/lws.svg"
                            alt=""
                        /> */}
                        <h1 className='text-xl font-bold text-blue-900'>SLEEPING SAGACITY</h1>
                    </Link>

                    {/* Search */}
                    <Search />
                </div>
            </nav>
        </>
    );
};

export default Navigation;