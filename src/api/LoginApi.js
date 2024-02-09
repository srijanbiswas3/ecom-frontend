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
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}


const signUp = async (signupData) => {
    try {
        const response = await axios.post('http://localhost:8080/signup', signupData);
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
export { login, check,signUp }