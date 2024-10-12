import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer group">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <img 
            src={image[0]} 
            alt="product-image" 
            className="group-hover:scale-110 transition ease-in-out object-cover object-center" 
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-m font-medium">{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem 