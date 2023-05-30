import axios from "axios";
axios.defaults.withCredentials = true;


const instance = axios.create({
    
    baseURL:'http://16.16.167.249/api/'
})

export default instance