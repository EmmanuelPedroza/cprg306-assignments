
"use client";

import MyBackButton from "../_components/my-back-button";
import { SHOPPING_LIST } from "../lib/constants";
import { useCallback, useState, useRef } from "react";
import List from "./_components/list";
import Form from "./_components/form";
import { getRecipesBySingleIngredient, getRecipesByMultipleIngredients } from "../lib/api-actions";
import RecipeList from "./_components/recipet-list";

const Page = () => {
    const [shoppingList, setShoppingList] = useState(SHOPPING_LIST);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [spoonacularAPIFlag, setSpoonacularAPIFlag] = useState(false);

    const listCompRef = useRef(null);
    const handleButtonClick = () => {
        const ids = listCompRef.current?.getSelectedItemIds() ?? [];
        console.log('Selected ids on demand (via ref):', ids);

        let ingredientNames = getShoppingListNamesAccordingToIds(ids);

        console.log(ingredientNames);

        // return;

        if (ids.length === 0) {
            console.warn("No items selected.");
            return;
        }

        if (ids.length === 1) {
            getRecipesBySingleIngredient(ingredientNames[0]).then(recipes => {
                console.log("Fetched recipes with chicken_breast:", recipes);
                setRecipeList(recipes ?? []);
            }).catch(error => {
                console.error("Error fetching recipes:", error);
            });
            setSpoonacularAPIFlag(false);
        } else {
            getRecipesByMultipleIngredients(ingredientNames).then(recipes => {
                console.log("Fetched recipes with multiple ingredients:", recipes);
                setRecipeList(recipes ?? []);
            }).catch(error => {
                console.error("Error fetching recipes:", error);
            });
            setSpoonacularAPIFlag(true);
        }
    };

    const getShoppingListNamesAccordingToIds = (ids) => {
        return shoppingList
            .filter(item => ids.includes(item.id))
            .map(item => item.name.split(',')[0].toLowerCase().trim())
            .map(name => 
                name
                    // .includes(',') == true ? item.name.split(',')[0] : item.name
                    // .toLowerCase()
                    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove most symbols and non-alphanumeric
                    .replace(/\p{Emoji_Presentation}/gu, '')
                    .trim('')
                    .replace(/\s+/g, '_') // Replace spaces with underscores
            );
    };

    const formCallback = useCallback(newItem => setShoppingList(prev => [...prev, newItem]), []);

    // const listProps = {
    //     selectedItemIds: selectedItemIds,
    //     setSelectedItemIds: setSelectedItemIds
    // };

    // const selectedItemsCallback = useCallback(ids => setSelectedItemIds(ids), []);

   

    return (
        <div className="container">
            <MyBackButton pageTitle="Week 8 - Assignment" />

            <h1 className="text-xl">
                Fetching Data from an API
            </h1>

            <Form onSubmit={formCallback} />

            <List items={shoppingList} ref={listCompRef} />


            <button onClick={handleButtonClick} className="mt-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Get Selected IDs
            </button>

            <RecipeList recipes={recipeList} spoonacularAPIFlag={spoonacularAPIFlag} />

             
            <div className="mt-10 p-5 border rounded-lg bg-gray-800 text-white">
                <h1 className="text-lg font-bold mb-3">Learnings:</h1>
                <ul className="list-disc list-inside">
                    <li>Understanding how to fetch data from external APIs using async functions and Promises.</li>
                    <li>Managing component state to handle loading, success, and error states during data fetching.</li>
                    <li>Implementing user interactions to trigger API calls and update the UI based on the fetched data.</li>
                    <li>Handling multiple selections and dynamically constructing API requests based on user input.</li>
                </ul>
            </div>
        </div>

    );

};

export default Page;