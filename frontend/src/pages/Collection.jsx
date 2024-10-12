import { useContext, useEffect, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { RxMixerVertical } from "react-icons/rx";


const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');


  const toggleShowFilter = () => {
    setShowFilter(prev => !prev);
  }
  
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // filter functionality
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }


  const sortProduct = () => {
    let filterProductsCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a,b)=>(a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a,b)=>(b.price - a.price)))
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  // watching filters changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch])

  // watching sorting filters
  useEffect(() => {
    sortProduct();
  }, [sortType])


  
  

  return (
    <div className="flex flex-col justify-center border-t">
      <div className="text-xl md:text-2xl lg:text-3xl text-center py-8">
        <Title text1={'ALL'} text2={'COLLECTIONS'}/>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
        {/* filter options */}
        <div className="sm:max-w-[150px]">
          {/* category filter */}
          <div className={`sm:max-w-[150px] px-5 py-3 mt-6 !mt-0 ${showFilter ? 'block' : 'hidden'} sm:block rounded-[12px] bg-[#ffffff] [box-shadow:1px_1px_3px_#d0d0d0,_-1px_-1px_3px_#f0f0f0]`}>
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Men'} onChange={toggleCategory}/>
                Men
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Women'} onChange={toggleCategory}/>
                Women
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Kids'} onChange={toggleCategory}/>
                Kids
              </p>
            </div>
          </div>
          {/* subcategory filter */}
          <div className={`sm:max-w-[150px] px-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block rounded-[12px] bg-[#ffffff] [box-shadow:1px_1px_3px_#d0d0d0,_-1px_-1px_3px_#f0f0f0]`}>
            <p className="mb-3 text-sm font-medium">Type</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Topwear'} onChange={toggleSubCategory}/>
                Topwear
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Bottomwear'} onChange={toggleSubCategory}/>
                Bottomwear
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3 accent-slate-700" value={'Winterwear'} onChange={toggleSubCategory}/>
                Winterwear
              </p>
            </div>
          </div>
          {/* Product Sort */}
          <select 
            className={`${showFilter ? '' : 'hidden'} sm:block text-sm bg-transparent 
            focus:outline-none focus:ring-0 peer self-start appearance-none hover:appearance-none px-2 py-2 border-b border-gray-300`} 
            onChange={(e)=>setSortType(e.target.value)}
          >
              <option value="relavent" className="hover:bg-black">Sort by: Relavent</option>
              <option value="low-high" className="">Sort by: Low to High</option>
              <option value="high-low" className="">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Side */}
        <div className="flex-1">
          <div className=" flex flex-wrap justify-between items-center sm:hidden gap-1 text-base sm:text-2xl mb-1 sm:mb-4 py-2.5">
            {/* toggle filters button */}
            <RxMixerVertical onClick={toggleShowFilter} className={`block sm:hidden w-[25px] h-[25px] cursor-pointer transition-all duration-500 ${!showFilter ? 'text-gray-600 rotate-0' : 'text-gray-300 rotate-90'}`} />
          </div>
          {/* Map Products */}
          {filterProducts.length > 0
          // PRODUCTS
          ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <ProductItem 
                  key={index}
                  id={item._id} 
                  image={item.image} 
                  name={item.name} 
                  price={item.price}/>
              ))}
            </div>
          // NO PRODUCTS 
          : <div className="flex justify-center items-center h-80">
              <span className="text-base font-semibold text-gray-400">
                No products in this category
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Collection