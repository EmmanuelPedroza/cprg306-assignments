"use client";
import { useState } from "react";

const Item = ({ index, item, onSelect, selected }) => {
    // const [selected, setSelected] = useState(false);
    
    // const handleClick = (item) => {
    //     setSelected(!selected);
    //     onSelect(item.name);
    // }

    const pulse = () => {
        setTimeout(() => {
            // setSelected(false);
        }, 1000);
    };

    return (
        <div 
            onClick={() => onSelect(item)} 
            key={index} 
            className={`
                ${selected ? "bg-green-600" : "bg-gray-800"}
                hover:scale-120 
                transition-transform 
                duration-200 
                border 
                rounded-lg 
                p-3 
                flex items-center 
                cursor-pointer
            `}>
            <div>
                <h2 className="text-md underline underline-offset-4 mb-2">{item.name}</h2>
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity}</p>
            </div>
        </div >
    );
};

export default Item;