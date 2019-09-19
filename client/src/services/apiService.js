import axios from 'axios'
const BASE_URL = process.env.REACT_APP_HEROKU_URL || 'http://localhost:8001'

const JWT_TOKEN = localStorage.getItem('token')

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
    
    }
})

export const login = async (data) => {
    try {
        const response = await apiClient.post('/auth/login', data)
        const { token, user } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('userId', user.id)
        return user

    } catch(e) {
        throw e
    }
}

export const signUp = async (data) => {
    try {
        const response = await apiClient.post('/auth/signup', data)
        const { token, user } = response.data

        localStorage.setItem('token', token)
        return user

    } catch(e) {
        throw e
    }
}

export const createBio = async (data) => {
    try {
        const response = await apiClient.post('/app/bio', data)
        const { user } = response.data
        return user
      
    } catch(e) {
        throw e
    }
}

export const getBio = async (bioId) => {
    try {
        const response = await apiClient.get(`/app/bio/${bioId}`)
        return response.data
    } catch (error) {
        throw error
        
    }
}

export const updateBio = async (bioId, data) => {
    try {
        let userId = localStorage.getItem('userId')
        const response = await apiClient.put(`/app/bios/user/${userId}/update/${bioId}`, data)
    
        return response
        
    } catch (e) {
        throw e
        
    }
}

export const deleteBio = async (bioId, data) => {
    try {
        const response = await apiClient.delete(`/app/bio/${bioId}/delete`, data)
    
        return response;
    } catch (e) {
        throw e
        
    }
}

export const getProfile = async () => {
    try {
        const response = await apiClient.get('/app/profile')
        const {user} = response.data
        console.log(getProfile)

        return user

    } catch(e) {
        throw e
    }
}

export const getDemoUser = async ()=> {
    try {
    
        const response = await apiClient.get('/app/bio/users/demos')
        // const {user} = response.data
        console.log(getDemoUser)

        // return user
        console.log(response)
        return response.data
    } catch(e) {
        throw e
    }
}

export const getNewUser = async (id)=> {
    try {
    
        const response = await apiClient.get(`/app/routine/users/${id}`)
        const {user} = response.data
        console.log(this.state)
        console.log(this.props)
        console.log(user)
        // return user
        
        console.log(response)

        return response.data
    } catch(e){
        throw e
    }
}

