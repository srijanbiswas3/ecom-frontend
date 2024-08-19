import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../ui/spinner';
const Loading = () => {

    const isLoading = useSelector(state => state.loading);

    if (!isLoading) return null;
    
    return (
        <div className=" w-full bg-white bg-opacity-80 flex items-center justify-center h-screen fixed z-30 ">
            <Spinner size="large" />
            Loading...
        </div>
    )
}

export default Loading