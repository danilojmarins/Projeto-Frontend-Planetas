import apiKey from './apiKey'

export const BACKEND = "https://projeto-backend-gti.herokuapp.com"
export const apiNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`

const config = { BACKEND, apiNasa }

export default config