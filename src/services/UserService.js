
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/user'

const UserService = {
    create: async (payload) => {
        return await axios.post(BASE_URL + '/', payload)
    },
    login: async (payload) => {
        return await axios.post(BASE_URL + '/login', payload)
    },
    logout: async () => {
        return await axios.post(BASE_URL + '/logout')
    },
    fetchAll: async () => {
        return await axios.get(BASE_URL)
    }

}

export default UserService;