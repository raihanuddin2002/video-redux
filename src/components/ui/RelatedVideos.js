import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../features/RelatedVideos/RelatedVideosSlice';
import SingleVideo from './SingleVideo';

const RelatedVideos = ({ tags, id }) => {
    const dispatch = useDispatch();
    const { relatedVideos } = useSelector(state => state.relatedVideos)


    useEffect(() => {
        dispatch(fetchRelatedVideos({ tags, id }))
    }, [tags, id, dispatch])

    return (
        <>
            <div
                className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
            >
                {/* <!-- single related video --> */}
                {
                    relatedVideos.map(relatedVideo => <SingleVideo relatedVideo={relatedVideo} />)
                }
            </div>
        </>
    );
};

export default RelatedVideos;