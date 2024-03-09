import { getAllProducts } from '@/api/ProductsApi';
import { GetAverageRatingsGroupByProductId } from '@/api/ReviewApi';
import Filter from '@/components/Filter/Filter';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";




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
  const [hideFilter, setHideFilter] = useState(true)
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
    <div className=' container mt-20'>
      <div className='flex justify-center'>

        <div className="z-20 w-full left-0 right-0 p-4 bg-white  drop-shadow lg:drop-shadow-none fixed lg:relative bottom-0 flex gap-2 md:hidden">
          <Button className=' h-14 w-1/2' onClick={() => { setHideFilter(!hideFilter); console.log(hideFilter) }}>Filter</Button>
          <Button variant='secondary' className=' h-14 w-1/2 ' >Sort</Button>
        </div>
        <div className={`md:w-1/5 min-w-52 fixed h-full z-10 w-full md:left-0 -mt-10 md:mt-0 ${hideFilter?'hidden':''} md:relative md:block `}>
          <Filter />
        </div>
        <div className='md:w-4/5 ml-3 space-y-3'>
          <span className='mx-3 '>Showing results for : search</span>
          <br />
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  '>

            {products.slice(itemCount.startItem, itemCount.endItem).map((product, index) => (
              <div className="flex justify-center" key={product?.id}>
                <ProductCard product={product} rating={ratings?.[product?.id]} />
              </div>
            ))}
          </div>
        </div>



      </div>
      {/*  <div className=' h-screen w-screen justify-end'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => { setItemCount({ startItem: itemCount.startItem - noOfItems, endItem: itemCount.startItem }); setCurrentPage(currentPage - 1) }} />
            </PaginationItem>

            {pages.map((page, index) => (
              <PaginationItem className={page === currentPage ? "bg-gray-300 shadow-md rounded-md" : ""}>
                <PaginationLink onClick={() => setCurrentPage(page)} >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))} 


            <PaginationItem>
              <PaginationNext onClick={() => { setItemCount({ startItem: itemCount.endItem, endItem: itemCount.endItem + noOfItems }); setCurrentPage(currentPage + 1) }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
            </div>*/}
    </div >
  )
}

export default Products