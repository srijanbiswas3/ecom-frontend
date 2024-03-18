import axios from 'axios'
import { gql, request } from 'graphql-request'

const MASTER_URL = import.meta.env.VITE_HYGRAPH_MASTER_URL
const baseUrl = import.meta.env.VITE_BASE_URL;

const getAllCategories = async () => {
    const response = await axios.get(`${baseUrl}/categories`)
    console.log(response);
  
    if (!response || !response.data) {
      return null
    }
    return response.data;
  }
  const GetCategoryIcon = async (imageId) => {
    const categoryicon = gql
    `query GetCategoryIcon {
        category(where: {id: "${imageId}"}) {
          id
          name
          icon {
            url
            id
          }
        }
      }
      `
  
    const result = await request(MASTER_URL, categoryicon)
    return result;
  }

  export {getAllCategories,GetCategoryIcon}