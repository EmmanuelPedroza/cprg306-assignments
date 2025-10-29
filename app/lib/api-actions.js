// single ingredient:
// www.themealdb.com/api/json/v1/1/list.php?i=listwww.themealdb.com/api/json/v1/1/list.php?i=listfilter.php?i=chicken_breast

// multiple ingredients:
// www.themealdb.com/api/json/v1/1/list.php?i=list

const API_URL = "https://www.themealdb.com/api/json/v1/1";
const RECIPES_ENDPOINT = "/filter.php?i=";
const INGREDIENTS_LIST_ENDPOINT = "/list.php?i=list";

// const API_NINJAS_API_URL = "https://api.api-ninjas.com/v1/recipes";
// const SECRET = "dS3jD4mJHRYA75gKRIkufQ==AUG45B4vnemR7M3V";

const SPOON_API_URL = "https://api.spoonacular.com";
const SPOON_SECRET = "084b432038ac46908fe7bc5ca942030e";
const SPOON_RECIPES_BY_INGREDIENTS_ENDPOINT = "/recipes/findByIngredients";

// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2?apiKey=

async function fetchRecipes (url, flag = false) {
    let arrayOfMeal = [];
    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            console.error("fetchRecipes:: Failed to fetch recipes, status code:", response.status);
            return arrayOfMeal;
        }       
        
        const resData = await response.json();
        
        if (flag) {
            resData.forEach(meal => {
                // arrayOfMeal.push({
                //     idMeal: meal.id,
                //     strMeal: meal.title,
                //     strMealThumb: meal.image
                // });
                meal.idMeal = meal.id;
                meal.strMeal = meal.title;
                meal.strMealThumb = meal.image;
            });
            
            console.warn("header quota left " , response.headers.get('X-Api-Quota-Left'));
            console.log("header quota used ", response.headers.get('X-Api-Quota-Used'));
            console.log("header quota request ", response.headers.get('X-Api-Quota-Request'));

            return arrayOfMeal = resData;


        } else {
            return arrayOfMeal = resData.meals;
        }
        
        
    } catch (error) {
        console.error("fetchRecipes:: Error fetching recipes:", error);
        throw error;
    }
}

export async function getRecipesBySingleIngredient(ingredient) {
    const url = `${API_URL}${RECIPES_ENDPOINT}${encodeURIComponent(ingredient)}`;
    return await fetchRecipes(url);
}

export async function getRecipesByMultipleIngredients(ingredients) {
    const url = `${SPOON_API_URL}${SPOON_RECIPES_BY_INGREDIENTS_ENDPOINT}?ingredients=${encodeURIComponent(ingredients.join(','))}&number=10&apiKey=${SPOON_SECRET}`;
    return await fetchRecipes(url, true);
}

// fetch a single recipe detail by id from TheMealDB
export async function getRecipeById(id, { signal } = {}) {
    if (!id) return null;
    const url = `${API_URL}/lookup.php?i=${encodeURIComponent(id)}`;
    try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
            console.error(`getRecipeById:: failed ${id}, status: ${res.status}`);
            return null;
        }
        const data = await res.json();
        return (data && data.meals && data.meals[0]) ? data.meals[0] : null;
    } catch (err) {
        if (err.name === 'AbortError') return null;
        console.error('getRecipeById:: error', err);
        return null;
    }
}
