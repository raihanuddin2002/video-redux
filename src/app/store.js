import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../features/video/videoSlice';
import videosReducer from '../features/videos/VideosSlice';
import relatedVideosReducer from "../features/RelatedVideos/RelatedVideosSlice";
import tagsReducer from "../features/tags/tagsSlice";
import filterReducer from '../features/filter/filterSlice';
import reactionReducer from '../features/reaction/reactionSlice';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
    videos: videosReducer,
    relatedVideos: relatedVideosReducer,
    tags: tagsReducer,
    filter: filterReducer,
    reaction: reactionReducer,
    pagination: paginationReducer
  },
});
