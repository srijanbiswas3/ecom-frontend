import axios from "axios";

const baseUrl=import.meta.env.VITE_BASE_URL;

const check = async () => {
    const response = await axios.get(`${baseUrl}`);
    console.log(response.data);
}

const login = async (email, password) => {
    try {
        axios.defaults.withCredentials = true
        const response = await axios.post(`${baseUrl}/login`, {
            email: email,
            password: password
        });
        
        const result = response.data;
        console.log(response.data)
        if (result || result==='') {
            return result;
        } else {
            console.error("no refresh token:", error);
            return null; // or handle the case where accessToken is missing
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}




const signUp = async (signupData) => {
    try {
        const response = await axios.post('http://localhost:8080/signup', {
            email: signupData.email,
            password: signupData.password,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            phoneNumber: signupData.phone,
            userType: signupData.userType,
            address: {
                addressLine1: signupData.addressLine1,
                addressLine2: signupData.addressLine2,
                city: signupData.city,
                state: signupData.state,
                zipCode: signupData.zipCode,
                country: signupData.country
            }
        });
        console.log(response.data);
        const result = response.data;
        return result.endsWith("success");
    } catch (error) {
        console.error("Error signing up:", error);
        return false;
    }
}

const logOut = async () => {
    axios.defaults.withCredentials = true
    await axios.post('http://localhost:8080/logout');
}

export { check, login, signUp,logOut };

