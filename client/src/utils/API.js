export const getFoods = () => {
    return fetch('/api/foods', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}

export const createFood = (foodData) => {
    return fetch('/api/foods', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData)
    })
    .then(res => res.json())
}

export const getRecipes = () => {
    return fetch('api/recipes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}

export const createRecipe = (recipeData) => {
    return fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(recipeData)
    })
    .then(res => res.json())
}