import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchFilter } from '../../features/filter/filterSlice';
import { fetchtags } from '../../features/tags/tagsSlice';
import Tag from './Tag';

const Tags = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector(state => state.tags);

    useEffect(() => {
        dispatch(fetchtags())
    }, [dispatch])

    // Reset Filtering
    const resetFilter = () => dispatch(resetSearchFilter())

    return (
        <div>
            {/* <!-- Tags --> */}
            <section>
                <div
                    className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto"
                >
                    {
                        tags.map(tag => <Tag key={tag.id} title={tag.title} />)
                    }
                    <span
                        className='ml-auto bg-red-600 text-white px-4 py-1 rounded-full cursor-pointer uppercase'
                        onClick={resetFilter}
                    >
                        reset
                    </span>
                </div>

            </section>
        </div>
    );
};

export default Tags;