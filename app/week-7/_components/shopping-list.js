"use client";

import { SHOPPING_LIST } from "@/app/lib/constants";
import ShoppingItem from "./shopping-item";
import { useState } from "react";

const ShoppingList = ({ shoppingList, setShoppingList, searchShoppingList }) => {
    const [searchBtnClicked, setSearchBtnClicked] = useState(false);
    const [searchPulseActive, setSearchPulseActive] = useState(false);
    
    const removeItem = (id) => {
        const updatedList = shoppingList.filter((item) => item.id !== id);
        setShoppingList(updatedList);
    }

    
    const searchBtnClick = () => {
        // console.log("Search clicked");
        setSearchBtnClicked(!searchBtnClicked);
    }

    const searchPulse = () => {
        // console.log("Search focused");
        setTimeout(() => {
            setSearchPulseActive(!searchPulseActive);
            console.log("Pulse toggled : " + searchPulseActive);
        }, 1000);
    }
    searchPulse();

    return (


        <div className="container mt-5 basis-1/2 bg-gray-800 border rounded-lg py-8 px-10">
            <div className="flex justify-between mb-5 border-b-5 border-b-double align-middle">
                <p className="pb-1">
                    <span className="font-bold text-lg">Item List</span> <br />
                    <span className="font-bold">Total Items:</span> {shoppingList.length}
                </p>
                <div className="flex items-center relative right-0">
                    <div
                        className={`transition-all duration-300 ease-in-out absolute right-0 top-1/2 -translate-y-1/2
                        ${searchBtnClicked ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                        `}
                        // className="opacity-100 scale-100"
                    >
                        <input type="text" onChange={(e) => searchShoppingList(e.target.value)} placeholder="Search items..." className="border rounded-md p-2 z-10 bg-gray-800" onBlur={() => setSearchBtnClicked(false)} />
                    </div>

                    <button
                        type="button"
                        className={
                            `${!searchBtnClicked ? "opacity-100 scale-100" : "opacity-0 scale-95"} 
                            ${!searchBtnClicked && searchPulseActive ? "animate-pulse text-amber-400" : "text-gray-800"}
                            hover:scale-200 
                            transition 
                            duration-400 
                            ease-in-out 
                            hover:text-blue-500 
                            mt-2 mb-2 ml-5 px-2 py-1 
                            top`
                        }
                        onClick={searchBtnClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            {shoppingList.map((item) => (
                <ShoppingItem {...item} removeItem={removeItem} key={item.id} />
            ))}
        </div>


    );
}

export default ShoppingList;