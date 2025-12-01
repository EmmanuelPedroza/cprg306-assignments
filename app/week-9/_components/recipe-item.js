const RecipeItem = ({ recipe, ingredients = [] }) => {

    return (
        <div className="border rounded-lg p-4 bg-gray-700">
            <h2 className="text-lg font-bold">{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded-md" />
            {ingredients.length < 1 ? (
                <p className="text-sm text-gray-400 mt-2">Loading ingredients...</p>
            ) : (
                <ul className="mt-3 text-sm list-disc list-inside text-gray-200">
                    {ingredients.map((it, i) => (
                        <li key={i}>{it}</li>
                    ))}
                </ul>
            )}
        </div>
    );

};
export default RecipeItem;