import React, { useReducer } from 'react';
import PersonService from '../services/PersonService';


const initialState = {
    error: '',
    person: {},
    loading: true
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PERSON':
            return {
                ...state,
                person: action.payload,
                loading: false
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state

    }
}
function UsePerson(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchByUserId = (payload) => {
        PersonService.fetchByUserId(payload)
            .then(res => {
                dispatch({ type: 'FETCH_PERSON', payload: res.data })
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: 'FETCH_ERROR',payload:err })
            })
    }
    return [state.person, fetchByUserId,state.error]
}
export default UsePerson