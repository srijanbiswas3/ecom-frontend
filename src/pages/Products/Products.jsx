import { getAllProducts } from '@/api/ProductsApi';
import { GetAverageRatingsGroupByProductId } from '@/api/ReviewApi';
import Filter from '@/components/Filter/Filter';
import ProductCard from '@/components/ProductCard/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';





function Products() {


  const navigate = useNavigate();
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const noOfItems = 10
  const [itemCount, setItemCount] = useState({
    startItem: 0,
    endItem: noOfItems
  })
  const [ratings, setRatings] = useState()
  const sample = []
  const pagess = []
  useEffect(() => {
    getProducts()
    getRatings()


    for (let i = 1; i < Math.ceil(products.length / noOfItems); i++) {
      pagess.push(i)
    }
    setPages(pagess)


  }, [])


  const getProducts = () => {

    getAllProducts()
      .then(resp => {
        console.log(resp);
        setProducts(resp)
      })

      .catch(error => {
        console.error("Error fetching products", error);

      });

  };


  const getRatings = () => {

    GetAverageRatingsGroupByProductId()
      .then(resp => {
        console.log(resp);
        setRatings(resp)
      })

      .catch(error => {
        console.error("Error fetching products", error);

      });

  };


  return (
    <div className=' container pt-20'>
      <div className='flex'>
        <Filter />
        <div className=' w-full right h-screen flex flex-wrap ml-5 '>
          {products.slice(itemCount.startItem, itemCount.endItem).map((product, index) => (

            <ProductCard product={product} key={product?.id} rating={ratings?.[product?.id]} />


          ))}
        </div>
      </div>
      <div className='m-5'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => { setItemCount({ startItem: itemCount.startItem - noOfItems, endItem: itemCount.startItem }); setCurrentPage(currentPage - 1) }} />
            </PaginationItem>

            {/* {pages.map((page, index) => (
              <PaginationItem className={page === currentPage ? "bg-gray-300 shadow-md rounded-md" : ""}>
                <PaginationLink onClick={() => setCurrentPage(page)} >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))} */}


            <PaginationItem>
              <PaginationNext onClick={() => { setItemCount({ startItem: itemCount.endItem, endItem: itemCount.endItem + noOfItems }); setCurrentPage(currentPage + 1) }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Products