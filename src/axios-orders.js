// this holds the instance of axios 
import axios from "axios"

const instance =axios.create({
    baseURL:"https://burger-app-react-js.firebaseio.com/"
}) 

export default instance