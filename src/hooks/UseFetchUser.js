import axios from 'axios'
import { useEffect, useReducer } from 'react'

const initialState = {
    loading: true,
    users: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: true
            }
        default:
            return state

    }
}

const useFetchUsers = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                dispatch({ type: 'FETCH_USERS', payload: res.data })
            })
            .catch(err => {
                dispatch({ type: 'FETCH_ERROR', payload: err.data })
            })
    }, [])

    //const findUserById
    //const findUserByUsername
    const addUser = (user) => {
        axios.post('http://localhost:4000/api/users', user)
            .then(res => {
                console.log('Res: ',res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editUser = (user) => {
        axios.put('http://localhost:4000/api/users',user)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.data)
            })
    }
    const deleteUser = (id) => {
        axios.delete('http://localhost:4000/api/users/', id)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.data)
            })
    }

    return [state.users, addUser,editUser,deleteUser]
}
export default useFetchUsers