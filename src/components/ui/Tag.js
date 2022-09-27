import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagRemoved, tagSelected } from '../../features/filter/filterSlice';

const Tag = ({ title }) => {
    const dispatch = useDispatch()
    const { tags } = useSelector(state => state.filter)
    const selected = tags.includes(title) ? true : false;
    const style = selected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600";

    const handleClick = () => {
        if (selected) dispatch(tagRemoved(title))
        else dispatch(tagSelected(title))
    }

    return (
        <>
            <div
                className={`${style} px-4 py-1 rounded-full cursor-pointer uppercase`}
                onClick={handleClick}
            >
                {title}
            </div>
        </>
    );
};

export default Tag;