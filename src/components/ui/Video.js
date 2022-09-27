import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateReaction } from '../../features/reaction/reactionSlice';
import { fetchSingleVideo } from '../../features/video/videoSlice';
import RelatedVideos from './RelatedVideos';

const Video = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const { video } = useSelector(state => state.video)
    const { id, title, description, link, tags, date, likes, unlikes } = video[0] || [];

    // for upadate useEffect
    const { totalLike, totalDislike, error } = useSelector(state => state.reaction)
    console.log(error);

    useEffect(() => {
        dispatch(fetchSingleVideo(videoId))
    }, [videoId, dispatch, totalLike, totalDislike]);


    // Handle Reaction
    const handleLike = () => {
        const updatedData = {
            likes: likes + 1
        }
        dispatch(updateReaction({ updatedData, id }))
    }
    const handleUnLike = () => {
        const updatedData = {
            unlikes: unlikes + 1
        }
        dispatch(updateReaction({ updatedData, id }))
    }

    return (
        <>
            <section className="pt-6 pb-20">
                <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            {/* <!-- video player --> */}
                            <iframe
                                width="100%"
                                className="aspect-video"
                                src={link}
                                title={title}
                                frameBorder=""
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            {/* <!-- video description --> */}
                            <div>
                                <h1
                                    className="text-lg font-semibold tracking-tight text-slate-800"
                                >
                                    {title}
                                </h1>
                                <div
                                    className="pb-4 flex items-center space-between border-b"
                                >
                                    <h2
                                        className="text-sm leading-[1.7142857] text-slate-600 w-full"
                                    >
                                        Uploaded on {date}
                                    </h2>

                                    {/* <!-- like/unlike --> */}
                                    <div className="flex gap-10 w-48">
                                        <div className="flex gap-1">
                                            <div className="shrink-0">
                                                <img
                                                    className="w-5 block"
                                                    src='/assets/like.svg'
                                                    alt="Like"
                                                    onClick={handleLike}
                                                />
                                            </div>
                                            <div
                                                className="text-sm leading-[1.7142857] text-slate-600"
                                            >
                                                {likes}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="shrink-0">
                                                <img
                                                    className="w-5 block"
                                                    src="/assets/unlike.svg"
                                                    alt="Unlike"
                                                    onClick={handleUnLike}
                                                />
                                            </div>
                                            <div
                                                className="text-sm leading-[1.7142857] text-slate-600"
                                            >
                                                {unlikes}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-4 text-sm text-[#334155] dark:text-slate-400"
                                >
                                    {description}
                                </div>
                            </div>
                        </div>

                        {/* <!-- related videos --> */}
                        <RelatedVideos tags={tags} id={id} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Video;