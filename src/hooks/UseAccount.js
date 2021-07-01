import { useEffect, useReducer, useState } from 'react';
import AccountService from '../services/AccountService';

const initalState = {
    loading: true,
    accounts: []
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ACCOUNTS':
            return {
                ...state,
                accounts: action.payload,
                loading: false
            }
        case 'ERROR':
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
function UseAccount(props) {
    const [state, dispatch] = useReducer(reducer, initalState)
    const [accountId, setAccountId] = useState('')

    useEffect(() => {
        AccountService.fetchAll()
            .then(res => {
                dispatch({ type: 'FETCH_ACCOUNTS', payload: res.data })
            }).catch(err => {
                dispatch({ type: 'ERROR', payload: err.data })
            })
    }, [])

    // const createNewAccount = (payload) => {
    //     AccountService.create(payload)
    // }
    const getAccountId = (accountName) => {
        for (let i = 0; i < state.accounts.length; i++) {
           if(state.accounts[i].account_name===accountName){
               setAccountId(state.accounts[i]._id)
           }
        }
    }

    return [state.accounts, accountId, getAccountId]
}

export default UseAccount;