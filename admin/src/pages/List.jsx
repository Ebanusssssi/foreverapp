import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App";
import axios from 'axios'
import { toast } from "react-toastify";


const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  

  return (
    <>
      <p className="mb-2 font-semibold text-sm">All products list</p>
      <div className="flex flex-col gap-2 sm:gap-2">

        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-white custom-shadow-sm text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between
              md:grid md:grid-cols-[1fr_6fr] items-center
              gap-1 sm:gap-2 py-1 px-1 border text-sm bg-white custom-shadow-sm"
            >
              <div className="w-full h-[300px] sm:w-[100px] sm:h-[100px] md:w-fit overflow-hidden rounded-md">
                <img src={item.image[0]} alt="product-image" className="h-full w-full object-cover object-center rounded-md" />
              </div>
              <div 
                className="flex flex-wrap items-end py-2 px-5 md:px-0 w-full justify-between
                sm:grid sm:grid-cols-[3fr_1fr_1fr_1fr] sm:items-center
                gap-2 rounded-md">
                <p className="font-semibold text-md sm:font-medium sm:text-sm">{item.name}</p>
                <p className="font-semibold text-md sm:font-medium sm:text-sm">{item.category}</p>
                <p className="font-semibold text-md sm:font-medium sm:text-sm">{currency} {item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-center text-md cursor-pointer text-red-600">
                  Delete
                </p>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List