import { useEffect, useState, useCallback } from "react"

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

export const useGetOne = (url) => {
    const callAPI = useCallback((parameter) => {
        return fetch(`${url}/${parameter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            }
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            throw error
        })
    }, [url])
    return [callAPI]
}

export const usePost = (url) => {
    const callAPI = useCallback((body) => {
         return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
            return data
         })
         .catch((error) => {
            throw error
         })
    }, [url])
    return [callAPI];
}