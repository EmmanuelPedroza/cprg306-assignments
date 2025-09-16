"use client";
import { useState } from "react";
import IncrementButton from "./increment-button";
import IncrementButton2 from "./increment-button-1";


export default function NewItem() {
    const [count, setCount] = useState(0);
    const btnProps = {
        onCountChange: setCount,
        parentCount: count,
        maxCount: 20,
        minCount: 0
    };

    return (
        <div>
            <h1>Simple Counter</h1>
                <p className="text-xs ml-2">Note: Count range is only between {btnProps.minCount} and {btnProps.maxCount}</p>
                <br/>
            <div className="container lg:flex lg:flex-row gap-10 mb-5 justify-center">
                <IncrementButton2 {...btnProps} />
                <IncrementButton {...btnProps} />
            </div>
            <br/>
            <br/>
            <div className="">
                <h1 className="text-xl underline underline-offset-4 mb-3">
                    Learnings from this assignment:
                </h1>
                <ul className="list-disc ml-5">
                    <li className="mb-3">Using the <span className="font-bold underline underline-offset-4">"use client"</span> directive when implementing components that will have <span className="font-bold underline underline-offset-4">states</span> and <span className="font-bold underline underline-offset-4">events</span></li>
                    <li className="mb-3">Implementing state management using the <span className="font-bold underline underline-offset-4">useState</span> hook.</li>
                    <li className="mb-3">Understanding the use of <span className="font-bold underline underline-offset-4">props</span> in React components.</li>
                    <li className="mb-3">Creating reusable components for better code organization.</li>
                </ul>
            </div>

        </div>
    );
}