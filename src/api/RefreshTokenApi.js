import axios from "axios";

const baseUrl=import.meta.env.VITE_BASE_URL;
const refreshTokenAndFetch = async (url, body, options) => {
    try {
        // Make the original request
        const response = await axios(url, { ...options, data: body });

        // Return the response if it's not unauthorized
        if (response.status !== 401) {
            return response.data;
        }

    } catch (error) {
        // Handle errors
        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized here
            console.error('Unauthorized error:', error);
            const refreshToken = localStorage.getItem('refresh_token');
            axios.defaults.withCredentials = true
            const refreshResponse = await axios.post(`${baseUrl}/refresh`, {
                refreshToken: refreshToken
            }
            );
            if (refreshResponse.status === 200) {
                localStorage.setItem('refresh_token', refreshResponse.data.refreshToken);
                // Retry the original request with updated token
                const newOptions = { ...options, data: body };
                axios.defaults.withCredentials = true
                return axios(url, newOptions).then(response => response.data);
            } else {
                throw new Error('Failed to refresh token');
            }
        } else {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}




export { refreshTokenAndFetch };

