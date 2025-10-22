"use client";
import { useState, useRef, useEffect } from "react";
import { ITEM_CATEGORIES } from "@/app/lib/constants";

const NewItem = () => {
    const [count, setCount] = useState(0);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const catergories = ITEM_CATEGORIES;
    const [selectedOption, setSelectedOption] = useState(catergories[0]);
    const [itemName, setItemName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Item Name: ${itemName}\nItem Quantity: ${count}\nItem Category: ${selectedOption}`);
        setItemName("");
        setCount(0);
        setSelectedOption(catergories[0]);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        setCount(count == 1 ? count : count - 1);
    }

    const handleIncrement = (e) => {
        e.preventDefault();
        setCount(count == 20 ? count : count + 1);
    }

    

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="container p-10">
            <div className="border rounded-lg py-5 bg-gray-800 text-white w-fit px-5 mx-5 justify-self-center">
                <form onSubmit={handleSubmit}>


                    <h1 className="text-lg">Form for New Item</h1>

                    <div className="mt-5 ml-5 mr-5">
                        <label className="mr-3">Item Name:</label>
                        <input required className="border-b px-2 focus:border-0" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>

                    <div className="mt-5 ml-5 mr-5">
                        <label className="mr-3">Item Quantity:</label>
                        <button type="button" className="border-1 px-2 hover:bg-white hover:text-black" onClick={(e) => handleDecrement(e)}>-</button>
                        <span className="mx-2">{count}</span>
                        <button type="button" className="border-1 px-2 hover:bg-white hover:text-black" onClick={(e) => handleIncrement(e)}>+</button>
                        <hr className="invisible" />
                        <span className="text-sm text-gray-400">
                            (Min: 1, Max: 20)
                        </span>
                    </div>

                    <div className="mt-5 ml-5 mr-5">
                        <label className="mr-3">Item Category:</label>
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button
                                type="button"
                                className="border-b px-4 pb-1 text-left w-48 focus:outline-none flex justify-between items-center"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span>{selectedOption}</span>

                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "transform rotate-180" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="absolute w-full rounded-b-xl shadow-lg z-10 max-h-60 overflow-auto">
                                    <ul className="py-1">
                                        {catergories.map((option) => (
                                            <li
                                                key={option}
                                                className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-100 hover:text-black cursor-pointer"
                                                onClick={() => {
                                                    setSelectedOption(option);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {option}
                                                <div className="border-b bottom-0"></div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 ml-5 mr-5 justify-self-center">
                        <button className="border rounded-lg px-5 py-2 hover:bg-white hover:text-black" type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div className="border rounded-lg py-5 bg-gray-800 text-white w-fit px-5 justify-self-center mt-20">
                <h1 className="text-lg">New Item Summary</h1>
                <div className="mt-5 ml-5 mr-5 ">
                    <p>Item Name: {itemName}</p>
                    <p>Item Quantity: {count}</p>
                    <p>Item Category: {selectedOption}</p>
                </div>
            </div>

            <div className="mt-20">
                <h1 className="text-lg">Learning from this Assignment</h1>
                <ul className="list-disc list-inside mt-5">
                    <li>Handling form submissions in React, including preventing default behavior and managing form data.</li>
                    <li>Using the useState hook to manage component state, such as form inputs and dropdown selections.</li>
                    <li>Implementing a custom dropdown component with toggle functionality and dynamic option rendering.</li>
                    <li>Using the useRef hook to reference DOM elements, which can be useful for managing focus or detecting clicks outside the component.</li>
                    <li>Applying conditional rendering to show or hide elements based on component state.</li>
                    <li>Styling components using Tailwind CSS classes for a consistent and responsive design.</li>
                    <li>Creating a user-friendly interface with interactive elements like buttons and dropdowns.</li>
                    <li>Understanding the importance of accessibility in form elements and interactive components.</li>
                </ul>
            </div>
        </div>
    );
};

export default NewItem;
