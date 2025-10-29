import { useState, useEffect } from 'react';
import { getRecipeById } from '../../lib/api-actions';

const RecipeList = ({ recipes = [], spoonacularAPIFlag}) => {
    const [pageRecipes, setPageRecipes] = useState([]);
    const [pageDetails, setPageDetails] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.max(1, Math.ceil(recipes.length / itemsPerPage));
    
    useEffect(() => {
        // ? = (1|2|3 -1) *10   ::  3-1 * 10 = 20
        const startIndex = (pageNumber - 1) * itemsPerPage;
        // ? = 0|10|20  + 10 
        const endIndex = startIndex + itemsPerPage;
        setPageRecipes(recipes.slice(startIndex, endIndex));

    }, [pageNumber, itemsPerPage, recipes]);

    // fetch details (ingredients, measures) for the recipes on the current page
    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const loadDetails = async () => {
            if (!pageRecipes || pageRecipes.length === 0) {
                setPageDetails([]);
                return;
            }

            const ids = pageRecipes.map(r => r.idMeal).filter(Boolean);
            try {
                const settled = await Promise.allSettled(
                    ids.map(id => getRecipeById(id, { signal: controller.signal }))
                );
                if (!mounted) return;
                const details = settled.map(s => (s.status === 'fulfilled' ? s.value : null));
                console.log("RecipeList:: loadDetails details", details);
                setPageDetails(details);
            } catch (err) {
                if (!mounted) return;
                console.error('RecipeList:: loadDetails error', err);
                setPageDetails(ids.map(() => null));
            }
        };

        loadDetails();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [pageRecipes]);

    // clamp pageNumber when recipes or itemsPerPage change
    useEffect(() => {
        if (pageNumber > totalPages) {
            setPageNumber(totalPages);
        }
        if (pageNumber < 1 && totalPages >= 1) {
            setPageNumber(1);   
        }
    }, [recipes, itemsPerPage, totalPages, pageNumber]);

    const goToPage = (targetPage) => {
        const p = Math.max(1, Math.min(totalPages, Number(targetPage) || 1));
        setPageNumber(p);
    }

    const prevPage = () => goToPage(pageNumber - 1);
    const nextPage = () => goToPage(pageNumber + 1);

    console.log("RecipeList:: pageRecipes:", pageRecipes);

    return (
        <div className="container mt-5 p-5 border rounded-lg bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Recipe List Component</h1>

            {/* pagination controls */}
            <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center mt-4">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm">
                    <label className="text-gray-300">Show</label>
                    <select
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                        value={itemsPerPage}
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPageNumber(1); }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-gray-400">per page</span>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-center md:justify-end gap-3">
                    <button
                        onClick={prevPage}
                        disabled={pageNumber === 1}
                        className="px-3 py-1 bg-gray-700 disabled:opacity-50 rounded border border-gray-600"
                    >
                        Prev
                    </button>
                    <div className="text-sm text-gray-200">Page {pageNumber} of {totalPages}</div>
                    <button
                        onClick={nextPage}
                        disabled={pageNumber === totalPages}
                        className="px-3 py-1 bg-gray-700 disabled:opacity-50 rounded border border-gray-600"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageRecipes.length === 0 ? (
                    <p className="mt-5">No recipes available.</p>
                ) : (
                    pageRecipes.map((recipe, idx) => {
                        
                        
                        const detail = pageDetails[idx] || null;
                        console.log("idx: ",idx)
                        console.log("pageDetails: ",pageDetails[idx])
                        // console.log("RecipeList:: rendering recipe detail:", detail);
                        const ingredients = [];
                        console.log("spoonacularAPIFlag:", spoonacularAPIFlag);
                        if(!spoonacularAPIFlag){ 

                            if (detail) {
                                for (let i = 1; i <= 20; i++) {
                                    const ing = detail[`strIngredient${i}`];
                                    const measure = detail[`strMeasure${i}`];
                                    if (ing && ing.trim()) {
                                        const text = measure && measure.trim() ? `${measure.trim()} ${ing.trim()}` : ing.trim();
                                        ingredients.push(text);
                                    }
                                }
                            }

                        } else {
                            console.log("spoon missedIngredients", recipe.missedIngredients);
                            console.log("spoon usedIngredients", recipe.usedIngredients);
                            recipe.usedIngredients.forEach((ing) => {
                                const measure = ing.amount ? `${ing.amount} ${ing.unit} ` : "";
                                const text = `${measure}${ing.name}, `;
                                ingredients.push(text);
                            });
                            recipe.missedIngredients.forEach((ing) => {
                                const measure = ing.amount ? `${ing.amount} ${ing.unit} ` : "";
                                const text = `${measure}${ing.name}, `;
                                ingredients.push(text);
                            });
                            
                        }

                        return (
                            <div key={recipe.idMeal ?? recipe.strMeal} className="border rounded-lg p-4 bg-gray-700">
                                <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded-md mb-2" />
                                {detail === null && pageDetails.length === 0 ? (
                                    <p className="text-sm text-gray-400">Loading ingredients...</p>
                                ) : (
                                    ingredients.length > 0 && (
                                        <ul className="mt-3 text-sm list-disc list-inside text-gray-200">
                                            {ingredients.map((it, i) => (
                                                <li key={i}>{it}</li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        
            
        </div>
    );
}

export default RecipeList;