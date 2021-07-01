import { useEffect, useReducer, useState } from 'react';
import PersonService from '../services/PersonService';

const initalState = {
    loading: true,
    profile: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PERSON':
            return {
                ...state,
                loading: false,
                profile: action.payload
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
function UseProfile() {
    const [state, dispatch] = useReducer(reducer, initalState)

    const [profileName, setProfileName] = useState('')

    // console.log(Object.entries(state.profile).length, state.profile)

    useEffect(() => {
        PersonService.fetchByName(profileName)
            .then(res => {
                dispatch({ type: 'FETCH_PERSON', payload: res.data })
            })
            .catch(err => {
                dispatch({ type: 'FETCH_ERROR' })
            })
    }, [profileName])

    const setProfile = (name) => {
        
        //console.log('UseProfile.js', Object.entries(state.profile).length, state.profile)
        if (Object.entries(state.profile).length === 0) {
            setProfileName(name)
        }


    }
    return [state.profile, setProfile]
}

export default UseProfile;