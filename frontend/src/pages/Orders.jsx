import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)

  const [ orderData, setOrderData ] = useState([])

  const loadOrderData = async () => {
    try {
      
      if (!token) {
        return null
      }
      
      const response = await axios.post(backendUrl + '/api/order/userorders',{}, { headers: {token} })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
        
      }
      

    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])
  

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="">
        {orderData.length > 0 
        ? orderData.map((item, index) => (
            <div
              key={index}
              className="py-4  border-t border-b text-gray-700 
              flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt="product-image" className="w-16 sm:w-20" />
                <div className="">
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price * item.quantity}</p>
                    <p className="">Quantity: {item.quantity}</p>
                    <p className="">Size: {item.size}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition-all ease duration-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        : <div className="min-h-[20vh] flex justify-center items-center my-20 text-center">
            <div className="w-full sm:w-[450px] flex flex-col items-center justify-center gap-5">
             <p className="text-md font-medium text-gray-300">You have no orders yet</p>
             <Link
               to='/collection'
               className="bg-white w-fit py-2 px-6 font-medium rounded-[12px] 
                         [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]
                         hover:bg-gray-900 hover:text-white transition-all ease"
             >
                 Our latest collection
             </Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Orders