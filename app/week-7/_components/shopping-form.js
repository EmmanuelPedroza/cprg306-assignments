"use client";

import { ITEM_CATEGORIES } from "@/app/lib/constants";
import { useState, useRef, useEffect } from "react";

const ShoppingForm = ({ addToShoppingList, handleSort }) => {

    const [count, setCount] = useState(0);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const catergories = ITEM_CATEGORIES;
    const [selectedOption, setSelectedOption] = useState(catergories[0]);
    const [itemName, setItemName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // alert(`Item Name: ${itemName}\nItem Quantity: ${count}\nItem Category: ${selectedOption}`);

        let newShoppingItem = {
            id: Math.random().toString(36).substring(2, 15),
            name: itemName,
            quantity: count,
            category: selectedOption.toLowerCase()
        };

        addToShoppingList(newShoppingItem);

        setItemName("");
        setCount(0);
        setSelectedOption(catergories[0]);
    };

    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
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
        <div className="container my-5 basis-1/2">
            {/* <p className="m-10 lg:block">Add new <span className="font-bold underline">items</span> to the list</p> */}
            <div className="container border rounded-lg  bg-gray-800 text-white p-5 lg:p-8">
                <form onSubmit={handleSubmit}>


                    <h1 className="text-lg underline underline-offset-8 mb-10">Form for New Item</h1>

                    <div className="mt-5 my-2">
                        <label className="mr-3">Item Name:</label>
                        <input required className="border-b px-2 focus:border-0  w-8/10 md:w-1/3 lg:w-1/3" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>

                    <div className="mt-5 my-1">
                        <div className="lg:flex items-center">
                            <label className="mr-3">Item Quantity:</label>
                            <div className="w-full md:w-auto flex items-center">
                                    <button type="button" className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == 1 ? count : count - 1)}>-</button>
                                    <span className="mx-2">{count}</span>
                                    <button type="button" className="border-1 px-2 hover:bg-white hover:text-black" onClick={() => setCount(count == 20 ? count : count + 1)}>+</button>
                            </div>
                        </div>
                        <hr className="invisible" />
                        <span className="text-sm text-gray-400">
                            (Min: 1, Max: 20)
                        </span>
                    </div>

                    <div className="mt-5 my-1">
                        <label className="mr-3">Item Category:</label>
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button
                                type="button"
                                className="w-full md:w-auto border-b px-4 pb-1 text-left focus:outline-none flex justify-between items-center"
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
                    <div className="mt-5 my-1 justify-self-center">
                        <button className="border rounded-lg px-5 py-2 hover:bg-white hover:text-black" type="submit">Submit</button>
                    </div>
                </form>

                
            </div>

            <div className="container border rounded-lg bg-gray-800 text-white mt-5 p-5: p-4 lg:p-8">
                <h1 className="text-lg mb-10 underline underline-offset-8">Sort List</h1>
                <div className="flex flex-col md:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => handleSort("name")}
                        className="border 
                        rounded-lg 
                        py-1 px-3 
                        hover:bg-white 
                        hover:text-black 
                        hover:scale-120
                        transition-all
                        duration-400
                        ease-in-out"> 
                        Name 
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSort("category")}
                        className="border 
                        rounded-lg 
                        py-1 px-3 
                        hover:bg-white 
                        hover:text-black 
                        hover:scale-120
                        transition-all
                        duration-400
                        ease-in-out"> 
                        Category 
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleSort("quantity")}
                        className="border 
                        rounded-lg 
                        py-1 px-3 
                        hover:bg-white 
                        hover:text-black 
                        hover:scale-120
                        transition-all
                        duration-400
                        ease-in-out"> 
                        Quantity 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingForm;