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

export const getFoods = () => {
    return fetch('/api/foods', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}