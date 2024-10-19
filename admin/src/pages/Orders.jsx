import { useState } from "react"
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { useEffect } from "react"
import { toast } from 'react-toastify'
import { assets } from "../assets/admin_assets/assets"

const Orders = ({ token }) => {

  const [ orders, setOrders ] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: {token} })
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } 
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: event.target.value}, { headers: {token} })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order updated')
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  

  return (
    <div>
      <h3 className="mb-2 font-semibold text-sm">Orders Page</h3>
      {
        orders.length > 0
        ? <div>
            {orders.map((order, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] 
                lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start p-5 
                md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 custom-shadow border-l-8
                ${order.status === 'Order placed' ? 'border-l-gray-400' 
                : order.status === 'Packing' ? 'border-l-yellow-400' 
                : order.status === 'Shipped' ? 'border-l-orange-400' 
                : order.status === 'Out for delivery' ? 'border-l-red-500' 
                : 'border-l-green-400'}`}
              >
                <div className="w-12 h-12 overflow-hidden">
                  <img src={assets.parcel_icon} alt="parcel-icon" className="w-full h-full object-cover object-center scale-110 contrast-150" />
                </div>
                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p key={index} className="py-0.5">{item.name} x {item.quantity} <span className="font-bold">{item.size}</span></p>
                      }
                      else {
                        return <p key={index} className="py-0.5">{item.name} x {item.quantity} <span className="font-bold">{item.size}</span>,</p>
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">{order.address.firstName + ' ' + order.address.lastName}</p>
                  <div className="font-medium">
                    <p>
                      {order.address.street + ','}
                    </p>
                    <p>
                      {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}
                    </p>
                  </div>
                  <p className="font-medium">{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px] font-medium">Items: {order.items.length}</p>
                  <p className="mt-3 text-xs">Method: <span className="text-green-500 font-bold text-sm">{order.paymentMethod}</span></p>
                  <p className="text-xs">Payment: <span className="font-bold text-sm text-green-500">{ order.payment ? 'Paid' : 'Pending' }</span></p>
                  <p className="mt-3">Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px] font-semibold">{currency}{order.amount}</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status} 
                  className="font-semibold px-3 py-2 outline-green-400 custom-shadow cursor-pointer"
                >
                  <option value="Order placed">Order placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        : <div className="flex items-center justify-center min-h-[500px] w-full">
            <p className="font-semibold text-md text-gray-300 select-none">No orders yet</p>
          </div>  
      }
    </div>
  )
}

export default Orders