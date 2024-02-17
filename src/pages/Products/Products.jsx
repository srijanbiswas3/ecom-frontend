import { GetProducts } from '@/api/ProductsApi';
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
  const sample = []
  const pagess = []
  useEffect(() => {
    getProducts()
    for (let i = 1; i < Math.ceil(products.length / noOfItems); i++) {
      pagess.push(i)
    }
    setPages(pagess)

  }, [])


  const getProducts = () => {
    GetProducts().then(resp => {
      console.log(resp.products);
      setProducts(resp.products)
    })
  }

  return (
    <div className=' container pt-20'>
      <div className='h-screen flex space-x-5 justify-around flex-wrap '>
        {products.slice(itemCount.startItem, itemCount.endItem).map((product, index) => (
          <div className='h-96 w-60 shadow-xl flex flex-col my-5' onClick={() => { navigate(`${product.id}`, { productId: product.id }) }} key={product?.id}>
            <img src={product?.images[1]?.url} alt="" className='-z-10 w-full h-64 object-cover scale-90 transition-transform duration-300 hover:scale-100' />
            <h1 className='text-center'>{product.name}</h1>
          </div>

        ))}
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