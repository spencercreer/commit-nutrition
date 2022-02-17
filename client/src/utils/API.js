export const createFood = (foodData) => {
    console.log(foodData)
    return fetch('/api/foods', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData)
    })
}