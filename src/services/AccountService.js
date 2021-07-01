
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/account'

const AccountService = {
    create: async (payload) => {
        return await axios.post(BASE_URL, payload)
    },
    fetchAll: async () => {
        return await axios.get(BASE_URL)
    },
    fetchByName: async (payload) => {
        return await axios.get(BASE_URL, payload)
    }

}

export default AccountService;