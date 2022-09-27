import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosForPagination, selectedPage } from '../../features/pagination/paginationSlice';
import { fetchVideos } from '../../features/videos/VideosSlice';
import Tags from './Tags';
import VideosGrid from './VideosGrid';

const Home = () => {
    const { videos } = useSelector(state => state.videos)
    const { dataCount, pageNo } = useSelector(state => state.pagination)
    const { tags, searchText, searchAuthor, error } = useSelector(state => state.filter)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchVideos({ tags, searchText, searchAuthor, pageNo }))
    }, [dispatch, tags, searchText, searchAuthor, pageNo]);

    // For Counting Pagination Page
    useEffect(() => {
        dispatch(fetchVideosForPagination({ tags, searchText, searchAuthor, pageNo }))
    }, [dispatch, tags, searchText, searchAuthor]);

    return (
        <>
            {/* Tags Grid */}
            <Tags />

            {/* <!-- Video Grid --> */}
            <section className="pt-12">
                <section className="pt-12">
                    <div
                        className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]"
                    >

                        {
                            videos.map(video => <VideosGrid key={video.id} video={video} />)
                        }

                        {/* <!-- error section */}
                        {error && <div className="col-span-12">{error}</div>}
                    </div>
                </section>
            </section>

            {/* <!-- pagination--> */}
            <section className="pt-12">
                <div
                    className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end"
                >
                    {
                        [...Array(Math.ceil(dataCount / 5))].map((_, index) => (
                            <div
                                key={index}
                                className={`${pageNo === index + 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}  px-4 py-1 rounded-full`}
                                onClick={() => dispatch(selectedPage(index + 1))}
                            >
                                {index + 1}
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );
};

export default Home;