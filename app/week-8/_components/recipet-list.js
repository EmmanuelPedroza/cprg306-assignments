import { useState, useEffect } from 'react';

const RecipeList = ({ recipes = [] }) => {
    const [pageRecipes, setPageRecipes] = useState([]);
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
                    pageRecipes.map((recipe) => (
                        <div key={recipe.idMeal ?? recipe.strMeal} className="border rounded-lg p-4 bg-gray-700">
                            <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded-md mb-2" />
                        </div>
                    ))
                )}
            </div>
        
            
        </div>
    );
}

export default RecipeList;