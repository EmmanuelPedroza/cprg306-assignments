
"use client";

import MyBackButton from "../_components/my-back-button";
import { SHOPPING_LIST } from "../lib/constants";
import { useCallback, useState, useEffect, useRef } from "react";
import List from "./_components/list";
import Form from "./_components/form";
import { getRecipesBySingleIngredient, getRecipesByMultipleIngredients } from "../lib/api-actions";
import RecipeList from "./_components/recipet-list";
import { useUserAuth } from "../_utils/auth-context";
import { getShoppingList, addItem, deleteItem } from "../_services/shopping-list-service";


const Page = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [spoonacularAPIFlag, setSpoonacularAPIFlag] = useState(false);
    const [isLoadButtonDisabled, setIsLoadButtonDisabled] = useState(false);
    const { user, gitHubSignIn, firebaseSignOut, googleSignIn } = useUserAuth();

    const loadItems = async () => {
        if (user) {
            const items = await getShoppingList(user.uid);
            setShoppingList(items);

            if (items.length > 0) {
                setIsLoadButtonDisabled(true);
            }
        }
    };

    useEffect(() => {
        loadItems();
    }, [user]);

    const handleAddItem = async (newItem) => {
        if (user) {
            const id = await addItem(user.uid, newItem);
            setShoppingList(prev => [...prev, { ...newItem, id }]);
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (user) {
            await deleteItem(user.uid, itemId);
            setShoppingList(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const loadInitialData = async () => {
        if (user) {
            setIsLoadButtonDisabled(true);
            try {
                for (const item of SHOPPING_LIST) {
                    await addItem(user.uid, item);
                }
                await loadItems();
            } catch (error) {
                console.error("Error loading initial data:", error);
            } finally {
                // Keep disabled to prevent spamming after success, or re-enable if you want to allow retry on error
                // setIsLoadButtonDisabled(false); 
            }
        }
    };

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

    const formCallback = useCallback(newItem => handleAddItem(newItem), [user]);

    // const listProps = {
    //     selectedItemIds: selectedItemIds,
    //     setSelectedItemIds: setSelectedItemIds
    // };

    // const selectedItemsCallback = useCallback(ids => setSelectedItemIds(ids), []);


    const [testEnv, setTestEnv] = useState(process.env.NEXT_PUBLIC_TEST_ENV);

    const myGitHubSignIn = () => {


        const test = gitHubSignIn();
        console.log(test);

    };

    const myGoogleSignIn = () => {
        googleSignIn();
    };


    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>Please sign in to access this page.</p>

                <div className="flex flex-col items-start gap-4">
                    <button className="mt-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={myGitHubSignIn}>Sign In with GitHub</button>
                    <button className="mt-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={myGoogleSignIn}>Sign In with Google</button>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <MyBackButton pageTitle="Week 9 - Assignment" user={user} onSignOut={firebaseSignOut} />

            <h1 className="text-xl">
                Adding Firebase Authentication to a Page
            </h1>

            <button
                onClick={loadInitialData}
                disabled={isLoadButtonDisabled}
                className={`mb-4 px-4 py-2 text-white rounded-lg transition duration-300 ${isLoadButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {isLoadButtonDisabled ? 'Loading...' : 'Load Initial Data'}
            </button>

            <Form onSubmit={formCallback} />

            <List items={shoppingList} ref={listCompRef} onDelete={handleDeleteItem} />


            <button onClick={handleButtonClick} className="mt-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Get Selected IDs
            </button>

            <RecipeList recipes={recipeList} spoonacularAPIFlag={spoonacularAPIFlag} />


            <div className="mt-10 p-5 border rounded-lg bg-gray-800 text-white">
                <h1 className="text-lg font-bold mb-3">Learnings:</h1>
                <ul className="list-disc list-inside">
                    <li>Adding Firebase Authentication to a Page</li>
                    <li>Implementing Firebase Authentication with GitHub and Google Sign-in</li>
                </ul>
            </div>

        </div>

    );

};

export default Page;