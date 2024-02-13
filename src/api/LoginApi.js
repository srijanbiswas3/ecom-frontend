import axios from "axios";

const check = async () => {
    const response = await axios.get('http://localhost:8080/');
    console.log(response.data);
}

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            email: email,
            password: password
        });
        const result = response.data;
        if (result && 'accessToken' in result) {
            return result;
        } else {
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
            userType:signupData.userType,
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

// axios.defaults.withCredentials = true;
// axios.get('/api/data')
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error));
export { check, login, signUp };