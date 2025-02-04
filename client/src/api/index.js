import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })



// Authentication API's 
export const SignupAPI = (newUser) => API.post('/auth/signup', newUser)

export const LoginAPI = (logindata) => API.post('/auth/login', logindata)

export const sendOTPAPI = (email) => API.post('/otp/send-otp', email)


// FAQ API's 

export const AddFaqAPI = (newData) => API.post('/faqs/create-faqs', newData)

export const GetFaqAPI = (language) => API.get(`/faqs/get-faqs?lang=${language}`)

export const GetFaqByIdAPI = (id) => API.get(`/faqs/get-faq-single/${id}`)

export const UpdateFaqAPI = (id, updatedData) => API.put(`/faqs/update-faqs/${id}`, updatedData)

export const DeleteFaqAPI = (id) => API.delete(`/faqs/delete-faqs/${id}`)