import { assets } from "../assets/frontend_assets/assets"

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div className="">
        <img src={assets.exchange_icon} alt="exchange-icon" className="w-12 m-auto mb-5" />
        <div className="font-semibold">Easy exchange policy</div>
        <div className="text-gray-400">We offer hassle free exchange policy</div>
      </div>
      <div className="">
        <img src={assets.quality_icon} alt="quality-icon" className="w-12 m-auto mb-5" />
        <div className="font-semibold">7 days return policy</div>
        <div className="text-gray-400">We provide 7 days FREE return policy</div>
      </div>
      <div className="">
        <img src={assets.support_img} alt="support-icon" className="w-12 m-auto mb-5" />
        <div className="font-semibold">Best customer support</div>
        <div className="text-gray-400">We provide 24/7 customer support</div>
      </div>
    </div>
  )
}

export default OurPolicy