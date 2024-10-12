import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData);

  }, [cartItems])
  

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className="">
        {
          cartData.map((item, index) => {

            const productData = products.find((product)=> product._id === item._id);

            return (
              <div 
                key={index}
                className="py-4 border-t border-b text-gray-700 grid
                          grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]
                          items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img 
                    src={productData.image[0]} 
                    alt="product-image"
                    className="w-16 sm:w-20"
                  />
                  <div className="">
                    <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="">{currency}{productData.price * item.quantity}</p>
                      <p className="font-semibold">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange=
                  {
                    (e) => e.target.value === '' || e.target.value === '0' 
                    ? null 
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  type="number" 
                  min={1} 
                  defaultValue={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon} 
                  alt="bin-icon"
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                />
              </div>
            )
          })
        }
      </div>
      {
        cartData.length > 0 
        ? <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="bg-white my-8 py-2 px-6 font-medium rounded-[2px] 
                            [box-shadow:1px_1px_2px_#d0d0d0,_-1px_-1px_2px_#f0f0f0]
                          hover:bg-green-500 hover:text-white transition-all ease">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        : <div className="min-h-[20vh] flex justify-center items-center my-20 text-center">
           <div className="w-full sm:w-[450px] flex flex-col items-center justify-center gap-5">
            <p className="text-md font-medium text-gray-300">Your cart is empty</p>
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
  )
}

export default Cart