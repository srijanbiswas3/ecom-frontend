import axios from 'axios'
import { gql, request } from 'graphql-request'

const MASTER_URL = import.meta.env.VITE_HYGRAPH_MASTER_URL
const baseUrl = import.meta.env.VITE_BASE_URL;

const getAllBrands = async () => {
    const response = await axios.get(`${baseUrl}/brands`)
    console.log(response);
  
    if (!response || !response.data) {
      return null
    }
    return response.data;
  }
  const GetBrandLogo = async (imageId) => {
    const brandlogo = gql`
    query BrandLogo {
      brand(where: {id: "${imageId}"}) {
        id
        name
        brandLogo {
          id
          url
        }
      }
    }`
  
    const result = await request(MASTER_URL, brandlogo)
    return result;
  }

  export {getAllBrands,GetBrandLogo}