"use client";
import { useState, useEffect } from "react";

const IncrementButton = ({...btnProps}) => {
    const {onCountChange, parentCount, maxCount=20, minCount=0} = {...btnProps};
    const [count, setCount] = useState(parentCount);
    
    useEffect(() => {
        onCountChange(count);
    }, [count]);

    useEffect(() => {
        setCount(parentCount);
    }, [parentCount]);

    return (
        <div className="flex w-fit items-center border py-1 px-5 rounded mt-5 lg:mt-0">
            <button className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == minCount ? count : count - 1)}>-</button> 
            <p className="mx-5 text-3xl">{count}</p>
            <button className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == maxCount ? count : count + 1)}>+</button>
        </div>
    );
}

export default IncrementButton;