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

export const useFilterGet = (url) => {
    const [state, setState] = useState()
    const [filteredState, setFilteredState] = useState({ data: null, loading: true })

    useEffect(() => {
        setFilteredState(state => ({ ...state, loading: true }))
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setState(data)
                setFilteredState({ data, loading: false })
            })
    }, [url, setState, setFilteredState])

    const filterState = useCallback((filter, search) => {

        const filteredList = state.filter(item => {
            const regex = new RegExp(search, "gi")
            const name = item.name
            const searched = regex.test(name)
            if (filter !== 'all') {
                return item.category === filter && searched
            } else {
                return searched
            }
        });

        setFilteredState({ data: filteredList, loading: false })
    })

    return [filteredState, filterState]
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
