import axios from "axios";


const getUserInfo = async () => {

    axios.defaults.withCredentials = true
    const respose = await axios.get('http://localhost:8080/user')

    if( respose.data==null)
    {
        throw Error("No user");
    }
    return respose.data;

}

export { getUserInfo }