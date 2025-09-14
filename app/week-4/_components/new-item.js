"use client";
import { useState } from "react";


export default function NewItem() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Add New Item (Simple Counter)</h1>
                <p>Note: Count range is only between 0 and 20</p>
                <br/>
            <div>

                <div className="border inline-block py-1 px-5 rounded ">
                    <p>Current Count: {count}</p>
                    <button className="hover:underline underline-offset-4" onClick={() => setCount(count == 20 ? count :count + 1)}>Increment Count (+)</button>
                    <br/>
                    <button className="hover:underline underline-offset-4" onClick={() => setCount(count == 0 ? count : count - 1)}>Decrement Count (-)</button>
                    <br/>
                    <button className="hover:underline underline-offset-4" onClick={() => setCount(0)}>Reset Count</button>
                </div>
                <br/>
                <br/>
                <div className="flex w-fit items-center border py-1 px-5 rounded">
                    <button className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == 0 ? count : count - 1)}>-</button> 
                    <p className="mx-5 text-3xl">{count}</p>
                    <button className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == 20 ? count : count + 1)}>+</button>
                </div>
            </div>
            
        </div>
    );
}