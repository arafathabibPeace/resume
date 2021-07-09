import { useEffect, useReducer } from 'react'
import UserService from '../services/UserService'


const initialState = {
    loading: true,
    loginError: true,
    users: [],
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

const UseUser = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    

    useEffect(() => {
        let users = ''
        UserService.fetchAll()
            .then(res => {
                users = res.data
                dispatch({ type: 'FETCH_USERS', payload: users })
                users = ''
            })
            .catch(err => {
                dispatch({ type: 'FETCH_ERROR', payload: err.data })
            })
        return () => { users = '' }
    }, [])



    return [state.users]
}
export default UseUser