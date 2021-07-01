
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/person'

const PersonService = {
    create: async (payload) => {
        return await axios.post(BASE_URL, payload)
    },
    fetchAll: async () => {
        return await axios.get(BASE_URL)
    },
    fetchByName: async (payload) => {
        //console.log('PersonService.js')
        return await axios.get('http://localhost:4000/api/profile/' + payload)
    },
    fetchById: async (payload) => {
        return await axios.get(BASE_URL + '/' + payload)
    },

}

export default PersonService;