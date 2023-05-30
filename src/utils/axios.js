import axios from "axios";
axios.defaults.withCredentials = true;


const instance = axios.create({
    
    baseURL:'https://api.trendtube.online/api/'
})

export default instance