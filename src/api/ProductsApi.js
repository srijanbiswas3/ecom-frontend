import axios from 'axios'
import { gql, request } from 'graphql-request'

const MASTER_URL = import.meta.env.VITE_HYGRAPH_MASTER_URL
const baseUrl = import.meta.env.VITE_BASE_URL;

const GetProducts = async () => {
  const products = gql`
    query Products {
        products {
          brand
          color
          description
          details
          discountPrice
          id
          images {
            url
          }
          itemSold
          name
          price
          rating
          stockCount
          warranty
        }
      }
      `

  const result = await request(MASTER_URL, products)
  return result;
}

const GetProduct = async (productId) => {
  const product = gql`
    query GetProduct {
      product(where: {id: "${productId}"}) {
        id
        name
        price
        rating
        warranty
        discountPrice
        details
        description
        color
        brand
        itemSold
        stockCount
        images {
          url
          id
          width
          height
        }
      }
    }
    
      `

  const result = await request(MASTER_URL, product)
  return result;
}

const GetProductImages = async (imageId) => {
  const productImages = gql`
  query ProductImages {
    productImageMapping(where: {id: "${imageId}"}) {
      id
      productImages {
        id
        url
      }
      name
    }
  }
  
  
      `

  const result = await request(MASTER_URL, productImages)
  return result;
}

const getAllProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`)
  console.log(response);

  if (!response || !response.data) {
    return null
  }
  return response.data;
}

const getProduct = async (productId) => {
  const response = await axios.get(`${baseUrl}/products/${productId}`)
  console.log(response);

  if (!response || !response.data) {
    return null
  }
  return response.data;
}


export { GetProduct, GetProducts, GetProductImages,getAllProducts,getProduct }

