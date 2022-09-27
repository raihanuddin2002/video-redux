import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchAuthor } from '../../features/filter/filterSlice';

const SingleVideo = ({ relatedVideo }) => {
    const dispatch = useDispatch();
    const { id, title, author, date, duration, views, thumbnail } = relatedVideo;

    // Filter By Author
    const handleSearchAuthor = () => dispatch(searchAuthor(author))

    // Show Views
    function showViews(viewCount) {
        switch (viewCount) {
            case viewCount === 0:
                return "No views";
            case viewCount === 1:
                return "1 views";

            default:
                return `${viewCount} views`;
        }
    }

    return (
        <>
            <div className="w-full flex flex-row gap-2 mb-4">
                <div
                    className="relative w-[168px] h-[94px] flex-none duration-300 hover:scale-[1.03]"
                >
                    <Link to={`/video/${id}`}>
                        <img
                            src={thumbnail}
                            className="object-cover"
                            alt={title}
                        />
                    </Link>
                    <p
                        className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
                    >
                        {duration}
                    </p>
                </div>

                <div className="flex flex-col w-full">
                    <Link to={`/video/${id}`}>
                        <p
                            className="text-slate-900 text-sm font-semibold"
                        >
                            {title}
                        </p>
                    </Link>
                    <Link to='/'>
                        <span
                            className="text-gray-400 text-xs mt-2 hover:text-gray-600 pointer-cursor"
                            onClick={handleSearchAuthor}
                        >
                            {author}
                        </span>
                    </Link>
                    <p className="text-gray-400 text-xs mt-1">
                        {showViews(views)} . {date}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SingleVideo;