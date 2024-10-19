import { useState } from "react"
import axios from "axios"
import { assets } from "../assets/admin_assets/assets"
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // IMAGES
  const [ image1, setImage1 ] = useState(false);
  const [ image2, setImage2 ] = useState(false);
  const [ image3, setImage3 ] = useState(false);
  const [ image4, setImage4 ] = useState(false);

  // INFO
  const [ name, setName] = useState('');
  const [ description, setDescription] = useState('');
  const [ price, setPrice] = useState('');
  const [ category, setCategory] = useState('Men');
  const [ subCategory, setSubCategory] = useState('Topwear');
  const [ bestseller, setBestseller] = useState(false);
  const [ sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      // PRODUCT DATA
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // IMAGES
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)
      

      // PASSING DATA TO BACKEND
      const response = await toast.promise(
        axios.post(backendUrl + "/api/product/add",formData,{headers: {token}}),
        {
          pending: 'Adding product',
          success: 'Product added 👌',
          error: 'Something went wrong 🤯'
        }
      )

      if (response.data.success) {
        // reset
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Men')
        setSubCategory('Topwear')
        setBestseller(false)
        setSizes([])

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else {
        toast.error(response.data.message)
      }
      

    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }


  return (
    <form 
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >

      {/* IMAGE UPLOAD */}
      <div className="">
        <p className="mb-2 font-semibold text-sm">Upload Image</p>
        <div className="flex gap-2 ">
          <label htmlFor="image1" className="cursor-pointer overflow-hidden border-2 border-transparent
                                hover:border-green-400 transition-all ease duration-100 custom-shadow max-w-20 h-auto">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload-image" className="w-full h-full object-cover object-bottom scale-125" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2" className="cursor-pointer overflow-hidden border-2 border-transparent
                                hover:border-green-400 transition-all ease duration-100 custom-shadow max-w-20 h-auto">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload-image" className="w-full h-full object-cover object-bottom scale-125" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3" className="cursor-pointer overflow-hidden border-2 border-transparent
                                hover:border-green-400 transition-all ease duration-100 custom-shadow max-w-20 h-auto">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload-image" className="w-full h-full object-cover object-bottom scale-125" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label htmlFor="image4" className="cursor-pointer overflow-hidden border-2 border-transparent
                                hover:border-green-400 transition-all ease duration-100 custom-shadow max-w-20 h-auto">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload-image" className="w-full h-full object-cover object-bottom scale-125" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
          </label>
        </div>
      </div>

      {/* PRODUCT NAME */}
      <div className="w-full">
        <p className="mb-2 font-semibold text-sm">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text" 
          placeholder="Name the product" 
          required  
          className="w-full max-w-[500px] px-3 py-2 outline-green-400 custom-shadow" 
        />
      </div>

      {/* PRODUCT DESCRIPTION */}
      <div className="w-full">
        <p className="mb-2 font-semibold text-sm">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text" 
          placeholder="Describe the product" 
          required  
          className="w-full max-w-[500px] min-h-fit px-3 py-2 outline-green-400 custom-shadow" 
        />
      </div>

      {/* PRODUCT CATEGORIES & PRICE */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 w-full">

        <div className="">
          <p className="mb-2 font-semibold text-sm whitespace-nowrap">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 outline-green-400 custom-shadow cursor-pointer"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2 font-semibold text-sm">Sub-category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border-2 border-white outline-green-400 custom-shadow cursor-pointer"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2 font-semibold text-sm">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="73"
            className="w-full sm:w-[120px] px-3 py-2 border-2 border-white outline-green-400 custom-shadow"
          />
        </div>

      </div>

      {/* SIZES */}
      <div className="">
        <p className="mb-2 font-semibold text-sm">Product sizes</p>
        <div className="flex flex-wrap gap-3">
          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
            <p className={`bg-white px-3 py-1 cursor-pointer border-2 border-white custom-shadow ${sizes.includes('S') ? '!bg-green-500 text-white' : ''}  `}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
            <p className={`bg-white px-3 py-1 cursor-pointer border-2 border-white custom-shadow ${sizes.includes('M') ? '!bg-green-500 text-white' : ''}  `}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
            <p className={`bg-white px-3 py-1 cursor-pointer border-2 border-white custom-shadow ${sizes.includes('L') ? '!bg-green-500 text-white' : ''}  `}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`bg-white px-3 py-1 cursor-pointer border-2 border-white custom-shadow ${sizes.includes('XL') ? '!bg-green-500 text-white' : ''}  `}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`bg-white px-3 py-1 cursor-pointer border-2 border-white custom-shadow ${sizes.includes('XXL') ? '!bg-green-500 text-white' : ''}  `}>XXL</p>
          </div>
        </div>
      </div>

      {/* BESTSELLER SELECTION */}
      <div className="flex items-center mt-2">
        <input 
          onChange={() => setBestseller(prev => !prev)}
          checked={bestseller}
          type="checkbox" 
          id="bestseller" 
          className="accent-green-600 w-4 h-4 cursor-pointer saturate-200" 
        />
        <label htmlFor="bestseller" className="font-semibold text-sm cursor-pointer select-none pl-2">Add to bestseller</label>
      </div>

      {/* FORM SUBMIT BUTTON */}
      <button 
        type="submit" 
        className="w-28 py-3 mt-4 text-sm font-semibold tracking-wide custom-shadow border-2 border-white
        hover:bg-green-500 hover:text-white transition-all ease duration-100"
      >
        Add
      </button>

    </form>
  )
}

export default Add