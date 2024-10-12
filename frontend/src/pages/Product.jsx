import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProtucts from "../components/RelatedProtucts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])
  

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col items-start gap-8 sm:flex-row ">
        {/* Product Images */}
        <div className="w-full sm:w-[60vw] flex flex-col-reverse gap-2 lg:gap-3 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:w-[18.7%] w-full overflow-x-auto overflow-y-scroll no-scrollbar">
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={()=>setImage(item)}
                  key={index}
                  src={item} 
                  alt="product-image"
                  className="w-[24%] sm:w-full flex-shrink-0 cursor-pointer"
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img 
              src={image}
              alt="product-image" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="w-full sm:w-[40vw]">
          <h1 className="font-medium text-2xl mt-2 sm:mt-0">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="star-icon" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-300">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-2 my-8">
            <p className="pl-1">Size:</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button
                    onClick={()=>setSize(item)}
                    key={index}
                    className=
                    {
                      `w-[45px] h-[45px] border py-2 px-2 cursor-pointer rounded-[12px] 
                      [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]
                      ${item === size ? 'bg-gray-900 text-white border-2 border-white' : 'bg-[#ffffff]'}`
                    }
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div> 
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm
                       active:bg-gray-700 rounded-[12px] 
                        [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-[4/5]" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="">100% Original product</p>
            <p className="">Cash on delivery is available on this product</p>
            <p className="">Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & Rewiew Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Rewiews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione ex cupiditate minima ipsa, repellendus aspernatur laborum corrupti officiis veniam voluptates molestiae aut labore distinctio cumque ducimus repellat numquam eaque cum suscipit? Aut quo dolorum itaque tempora, blanditiis quam modi. Eaque dolor optio nobis repudiandae commodi pariatur consectetur! Reprehenderit non excepturi magni nam numquam quidem nisi placeat? Voluptas cumque ipsa, eius quod labore magni numquam. Qui exercitationem quidem in dicta nisi repellendus corporis omnis ea rem rerum iusto neque suscipit saepe accusantium, nesciunt distinctio eos porro dolore incidunt voluptatum id. Architecto quae distinctio accusamus praesentium dolores tempore asperiores quasi assumenda quidem?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi obcaecati voluptate expedita quam, facere ratione excepturi sapiente, ut nemo, iste voluptates placeat repudiandae. Rem, pariatur iste quae maiores error quos recusandae rerum quasi dolor totam ducimus vitae deleniti accusantium tempore ab obcaecati reiciendis nesciunt neque praesentium quia asperiores fuga doloribus! Quasi eligendi, tempora cumque, totam voluptatum, blanditiis doloremque itaque commodi labore asperiores recusandae reiciendis nostrum quos at eveniet similique rem.</p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProtucts category={productData.category} subCategory={productData.subCategory} id={productData._id}/>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product