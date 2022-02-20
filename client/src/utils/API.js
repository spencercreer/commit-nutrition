export const createFood = (foodData) => {
    return fetch('/api/foods', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData)
    })
}

export const getFoods = () => {
    return fetch('/api/foods', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}