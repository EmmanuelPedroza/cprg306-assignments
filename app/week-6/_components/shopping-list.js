"use client";

import { SHOPPING_LIST } from "@/app/lib/constants";
import ShoppingItem from "./shopping-item";
import { useState } from "react";

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState(SHOPPING_LIST);

    const sortByName = () => {
        const sorted = [...shoppingList].sort((a, b) => a.name.localeCompare(b.name));
        setShoppingList(sorted);
    };

    const sortByCategory = () => {
        shoppingList.sort((a, b) => a.category.localeCompare(b.category));
        setShoppingList([...shoppingList]);
    }



    return (
        <div className="container p-10">
            <h1 className="text-lg">Shopping List</h1>
            <div className="m-5 flex flex-col-reverse lg:flex-row items-center">
                
                <div className="container mt-5 basis-1/2 bg-gray-800 border rounded-lg w-fit py-8 px-10">
                    {shoppingList.map((item) => (
                        <ShoppingItem {...item} key={item.id} />
                    ))}
                </div>

                <div className="my-5 basis-1/2 justify-items-center">
                    <p className="m-10 hidden lg:block">These buttons will sort the data at the <span className="font-bold underline">left</span> hand side</p>
                    <div className="flex flex-row gap-3 bg-gray-800 border rounded-lg w-fit py-5 px-3">
                        <p className="">Sort by:</p>
                        <button className="border px-4 py-1 rounded-md hover:bg-white hover:text-black" onClick={() => sortByName()}>Name</button>
                        <button className="border px-4 py-1 rounded-md hover:bg-white hover:text-black" onClick={() => sortByCategory()}>Category</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ShoppingList;