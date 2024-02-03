import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/cls1rkjjp2v9y01teefrmdt5y/master'

const getCarousells = async () => {
  const carousells = gql`
    query Carousells {
        carousells {
          catergory
          id
          link
          name
          image {
            id
            url
          }
        }
      }`

  const result = await request(MASTER_URL, carousells)
  return result;
}

const GetCategories = async () => {
  const categories = gql`
  query Categories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `

  const result = await request(MASTER_URL, categories)
  return result;
}

const GetBrands = async () => {
  const brands = gql`
    query Brands {
  brands {
    brandImages {
      url
    }
    brandLogo {
      url
    }
    name
    id
    description
  }
}`

  const result = await request(MASTER_URL, brands)
  return result;
}

export { getCarousells,GetBrands,GetCategories}