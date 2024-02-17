import axios from "axios";
import { refreshTokenAndFetch } from "./RefreshTokenApi";

const baseUrl=import.meta.env.VITE_BASE_URL;

const getUserInfo = async () => {

     axios.defaults.withCredentials = true

    const url = `${baseUrl}/user`; // URL for the request
    const options = {
        method: 'GET', 
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
           
        }
    };
   return refreshTokenAndFetch(url, options)
   
    // const respose = await axios.get(url,options)

    // console.log(respose)
    // if (respose.data == null) {
    //     throw Error("No user");
    // }
    // return respose.data;

}

export { getUserInfo }