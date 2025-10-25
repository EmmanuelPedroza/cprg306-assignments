// single ingredient:
// www.themealdb.com/api/json/v1/1/list.php?i=listwww.themealdb.com/api/json/v1/1/list.php?i=listfilter.php?i=chicken_breast

// multiple ingredients:
// www.themealdb.com/api/json/v1/1/list.php?i=list

const API_URL = "https://www.themealdb.com/api/json/v1/1";
const RECIPES_ENDPOINT = "/filter.php?i=";
const INGREDIENTS_LIST_ENDPOINT = "/list.php?i=list";

async function fetchRecipes (url) {
    let arrayOfMeal = [];
    try {
        const response = await fetch(url);
        
        if (response.status !== 200) {
            console.error("fetchRecipes:: Failed to fetch recipes, status code:", response.status);
            return arrayOfMeal;
        }       
        
        const resData = await response.json();
        return arrayOfMeal = resData.meals;
    } catch (error) {
        console.error("fetchRecipes:: Error fetching recipes:", error);
        throw error;
    }
}

export async function getRecipesBySingleIngredient(ingredient) {
    const url = `${API_URL}${RECIPES_ENDPOINT}${encodeURIComponent(ingredient)}`;
    return await fetchRecipes(url);
}

