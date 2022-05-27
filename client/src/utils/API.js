import { useEffect, useState } from "react"

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

export const useGet = (url) => {
    const [state, setState] = useState({ data: null, loading: true })

    useEffect(() => {
        setState(state => ({ data: state.data, loading: true }))
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setState({ data, loading: false })
        })
    }, [url, setState])

    return state
}