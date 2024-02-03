import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/cls1rkjjp2v9y01teefrmdt5y/master'

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
        }
      }
    }
    
      `

  const result = await request(MASTER_URL, product)
  return result;
}

export { GetProducts, GetProduct }