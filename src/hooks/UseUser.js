import { useEffect, useReducer } from 'react'
import UserService from '../services/UserService'

const initialState = {
    loading: true,
    loginError: true,
    users: [],
    userId: '',
    accessToken: '',
    refreshToken: ''
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
        case 'SET_TOKENS':
            return {
                ...state,
                userId: action.payload._id,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loginError: false
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: true
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

    const register = (payload) => {
        UserService.create(payload)
            .then(res => {
                console.log(res.data)
            })
    }

    const login = (payload) => {
        UserService.login(payload)
            .then(res => {
                sessionStorage.setItem('isAuth', true);
                dispatch({ type: 'SET_TOKENS', payload: res.data })
                window.location.reload(true);
                window.location.href = "http://localhost:3000/";
            })
            .catch(err => {
                console.log(err)
            })
    }


    const logout = async () => {
        await UserService.logout()
            .then(() => {
                sessionStorage.removeItem('isAuth')
            })
    }


    return [state.users, login, register, logout, state.userId]
}
export default UseUser