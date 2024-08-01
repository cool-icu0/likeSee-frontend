import axios from "axios";

const myAxios = axios.create({
    baseURL:'http://localhost:8080/api'
});
myAxios.interceptors.request.use(
    function (config) {
        console.log("我要发请求了",config)
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)
myAxios.interceptors.response.use(
    function (response){
        console.log("我收到你的请求了",response)
        return response;
    },
    function (error){
        return Promise.reject(error);
    }
)
export default myAxios;