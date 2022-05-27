import { useEffect, useState, useCallback } from "react"

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
        setState(state => ({ ...state, loading: true }))
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

// export const usePost = (url, body) => {
//     const [state, setState] = useState({ data: null, error: null, loading: false });
//     const callAPI = useCallback(() => {
//          setState(state => ({ ...state, loading: true }));
//          fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'  
//             },
//             body: JSON.stringify(body)
//          })
//          .then(res => res.json())
//          .then(data => {
//             setState({ data, loading: false, error: null });
//          }).catch((error) => {
//             setState({ data: null, loading: false, error });
//          })
//     }, [url, headers, payload])
//     return [state, callAPI];
// }