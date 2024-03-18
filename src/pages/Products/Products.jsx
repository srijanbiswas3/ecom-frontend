import { getAllProducts } from '@/api/ProductsApi';
import { GetAverageRatingsGroupByProductId } from '@/api/ReviewApi';
import Filter from '@/components/Filter/Filter';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ALargeSmall, ArrowDownWideNarrow, ArrowUpDown, ArrowUpWideNarrow, Filter as FilterIcon, GanttChart, Star } from "lucide-react";


function Products() {


  const navigate = useNavigate();
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
  const noOfItems = 10
  const [itemCount, setItemCount] = useState({
    startItem: 0,
    endItem: noOfItems
  })
  const [hideFilter, setHideFilter] = useState(true)
  const [ratings, setRatings] = useState()

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
        setFilterProducts(resp)
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
  const compareByRating = (productIdA, productIdB) => {
    const ratingA = ratings?.[productIdA]?.avgRating || 0;
    const ratingB = ratings?.[productIdB]?.avgRating || 0;
    return ratingB - ratingA; // Descending order
  };

  const compareByReviews = (productIdA, productIdB) => {
    const reviewCountA = ratings?.[productIdA]?.userCount || 0;
    const reviewCountB = ratings?.[productIdB]?.userCount || 0;
    return reviewCountB - reviewCountA; // Descending order
  };
  const handleSort = (sortBy) => {
    console.log(sortBy)
    switch (sortBy) {
      case 'name':
        return setFilterProducts(filterProducts.slice().sort((a, b) => a.name.localeCompare(b.name)));
      case 'rating':
        return setFilterProducts(filterProducts.slice().sort((a, b) => compareByRating(a.id, b.id)));
      case 'reviews':
        return setFilterProducts(filterProducts.slice().sort((a, b) => compareByReviews(a.id, b.id)));
      case 'pricehl':
        return setFilterProducts(filterProducts.slice().sort((a, b) => b.discountedPrice - a.discountedPrice));
      case 'pricelh':
        return setFilterProducts(filterProducts.slice().sort((a, b) => a.discountedPrice - b.discountedPrice));
      default:
        return filterProducts;
    }

  }

  return (
    <div className=' container mt-20'>
      <div className='flex justify-center'>

        <div className="z-20 w-full left-0 right-0 p-4 bg-white  drop-shadow lg:drop-shadow-none fixed lg:relative bottom-0 flex gap-2 md:hidden">
          <Button className=' h-14 w-1/2' onClick={() => { setHideFilter(!hideFilter); console.log(hideFilter) }}><FilterIcon className="mr-2 h-4 w-4 " /> Filter</Button>
          <Button variant='secondary' className=' h-14 w-1/2 ' ><ArrowUpDown className="mr-2 h-4 w-4 " />Sort</Button>
        </div>
        <div className={`md:w-1/5 min-w-52 fixed h-full z-10 w-full md:left-0 -mt-10 md:mt-0 ${hideFilter ? 'hidden' : ''} md:relative md:block `}>
          <Filter setFilterProducts={setFilterProducts} filterProducts={filterProducts} products={products}  />
        </div>
        <div className='md:w-4/5 ml-3 space-y-3 '>
          <div className='flex justify-between w-full '>
            <p className='mx-3 '>Showing results for : search</p>
            {/* <Button variant='outline' className='hidden md:flex' onClick >
              <ArrowUpDown className="mr-2 h-4 w-4 " />Sort
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger >
                <Button variant='outline' className='hidden md:flex'>
                  <ArrowUpDown className="mr-2 h-4 w-4 " />Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSort('name')}><ALargeSmall className="mr-2 h-4 w-4 " />Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('pricehl')}><ArrowDownWideNarrow className="mr-2 h-4 w-4 " />Price(High-Low)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('pricelh')}><ArrowUpWideNarrow className="mr-2 h-4 w-4 " />Price(Low-High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('rating')}><Star className="mr-2 h-4 w-4 " />Rating</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('reviews')}><GanttChart className="mr-2 h-4 w-4 " />Reviews</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <br />
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  '>

            {filterProducts.slice(itemCount.startItem, itemCount.endItem).map((product, index) => (
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