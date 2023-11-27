import axios from 'axios'

export default axios.create({
    baseURL: 'https://medassist-api.onrender.com/api/v1'
})

export const axiosPrivate =  axios.create({
    baseURL: 'https://medassist-api.onrender.com/api/v1/auth',
    headers: {'Content-Type': 'application/json'}
})