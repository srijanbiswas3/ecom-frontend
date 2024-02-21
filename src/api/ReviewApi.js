import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Get all reviews for a product
const GetReviewsByProductId = async (productId) => {
    try {
        const response = await axios.get(`${baseUrl}/reviews/${productId}`);
        console.log("Reviews for Product ", productId, ": ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        return [];
    }
};

// Get average ratings grouped by product ID
const GetAverageRatingsGroupByProductId = async () => {
    try {
        const response = await axios.get(`${baseUrl}/reviews/average`);
        console.log("Average Ratings Grouped By Product ID: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching average ratings grouped by product ID: ", error);
        return [];
    }
};

// Add a new review
const AddReview = async (reviewData) => {
    try {
        const response = await axios.post(`${baseUrl}/reviews`, reviewData);
        console.log("Review added successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding review: ", error);
        throw error;
    }
};

// Edit a review
const EditReview = async (reviewId, updatedReviewData) => {
    try {
        const response = await axios.put(`${baseUrl}/reviews/${reviewId}`, updatedReviewData);
        console.log("Review edited successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error editing review: ", error);
        throw error;
    }
};

// Delete a review
const DeleteReview = async (reviewId) => {
    try {
        const response = await axios.delete(`${baseUrl}/reviews/${reviewId}`);
        console.log("Review deleted successfully");
        return response.data;
    } catch (error) {
        console.error("Error deleting review: ", error);
        throw error;
    }
};


export {GetReviewsByProductId,GetAverageRatingsGroupByProductId,AddReview,EditReview,DeleteReview}