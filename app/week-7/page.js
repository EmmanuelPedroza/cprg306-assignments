"use client";
import MyBackButton from "../_components/my-back-button";
import ShoppingList from "./_components/shopping-list";
import ShoppingForm from "./_components/shopping-form";
import { SHOPPING_LIST } from "@/app/lib/constants";
import { useState } from "react";

const Page = () => {
    const [shoppingList, setShoppingList] = useState(SHOPPING_LIST);

    const addToShoppingList = (newItem) => {
        setShoppingList([...shoppingList, newItem]);
    }

    const checkSorting = (arr, criteria) => {
        for (let i = 1; i < arr.length; i++) {
            if (criteria === "name" || criteria === "category") {
                if (arr[i - 1][criteria].localeCompare(arr[i][criteria]) > 0) {
                    return false;
                }
            } else if (criteria === "quantity") {
                if (arr[i - 1][criteria] > arr[i][criteria]) {
                    return false;
                }
            }
        }
        return true;
    }

    const searchShoppingList = (keyWord) => {
        
        if (keyWord.trim() === "") {
            setShoppingList(SHOPPING_LIST);
            return;
        }
        const filteredList = shoppingList.filter((item) =>
            item.name.toLowerCase().includes(keyWord.toLowerCase()) ||
            item.category.toLowerCase().includes(keyWord.toLowerCase()) ||
            item.quantity.toString().includes(keyWord.toLowerCase())
        );
        setShoppingList(filteredList);

        // console.log(keyWord);
    };

    const handleSort = (criteria) => {
        let sortedList = [];
        if (!checkSorting(shoppingList, criteria)) {
            // handle async sort
            sortedList = [...shoppingList].sort((a, b) => {
                if (criteria === "name") {
                    return a.name.localeCompare(b.name);
                } else if (criteria === "category") {
                    return a.category.localeCompare(b.category);
                } else if (criteria === "quantity") {
                    return a.quantity - b.quantity;
                }
            });
        } else {
            // handle desc sort 
            sortedList = [...shoppingList].sort((a, b) => {
                if (criteria === "name") {
                    return b.name.localeCompare(a.name);
                } else if (criteria === "category") {
                    return b.category.localeCompare(a.category);
                } else if (criteria === "quantity") {
                    return b.quantity - a.quantity;
                }
            });
        }
        setShoppingList(sortedList);

    };

    return (
        <div>
            <MyBackButton pageTitle={"Week 7 - Assignment"} />
            {/* <ShoppingList /> */}

            <div className="container pt-10 my-3">
                <h1 className="text-xl">Adding Items to the List</h1>
                <div className="sm:m-5 md:m-5 flex flex-col lg:flex-row items-top gap-10">
                    <ShoppingForm handleSort={handleSort} addToShoppingList={addToShoppingList} />
                    <ShoppingList shoppingList={shoppingList} setShoppingList={setShoppingList} searchShoppingList={searchShoppingList} />
                </div>

                <div className="container sm:m-5 md:m-5">
                    <h1 className="text-lg">Learning from this Assignment</h1>
                    <ul className="list-disc m-5">
                        <li>Learned how to lift state up in React components to share data between sibling components.</li>
                        <li>Learned how to implement search functionality in a list by filtering items based on user input.</li>
                        <li>Learned how to implement sorting functionality that toggles between ascending and descending order based on the current state of the list.</li>
                        <li>Improved understanding of React hooks, particularly useState, for managing component state.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Page;