"user client";

import { useEffect, useState } from "react";

const IncrementButton2 = ({...btnProps}) => {
    const {onCountChange, parentCount, maxCount=20, minCount=0} = {...btnProps};
    const [count, setCount] = useState(parentCount);

    useEffect(() => {
        onCountChange(count);
    }, [count]);
    useEffect(() => {
        setCount(parentCount);
    }, [parentCount]);

    return (
        <div className="border inline-block py-1 px-5 rounded ">
            <p>Current Count: {count}</p>
            <button className="hover:underline underline-offset-4" onClick={() => setCount(count == maxCount ? count :count + 1)}>Increment Count (+)</button>
            <br/>
            <button className="hover:underline underline-offset-4" onClick={() => setCount(count == minCount ? count : count - 1)}>Decrement Count (-)</button>
            <br/>
            <button className="hover:underline underline-offset-4" onClick={() => setCount(0)}>Reset Count</button>
        </div>
    );
}
export default IncrementButton2;