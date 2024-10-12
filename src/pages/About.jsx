import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='flex flex-col'>
      <div className=" text-xl sm:text-3xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="mb-10 mt-2 sm:mt-5 flex flex-col lg:flex-row gap-8 sm:gap-16">
        <img src={assets.about_img} alt="about-image" className="w-full h-[300px] lg:h-[450px] object-cover"/>
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui mollitia deleniti facere quod. Nulla natus quaerat eveniet dolore? Vero numquam libero corporis dolorum mollitia neque cum illo similique velit eius aliquam, maiores vitae, enim minima eos perspiciatis quod magnam rerum, ut hic. Blanditiis rem quasi dignissimos aperiam minus minima aut
          </p>
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste dolore iusto inventore sed ullam a exercitationem perspiciatis qui expedita! Illo quas asperiores, possimus placeat impedit beatae harum fuga provident quisquam. Eaque expedita
          </p>
          <b className="text-gray-800">Our mission</b>
          <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti suscipit odit aliquid quisquam, in optio numquam quae rerum nihil id aut similique cumque modi reiciendis voluptatum atque consectetur amet deserunt!</p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col lg:flex-row text-sm mb-20">
        <div className="flex flex-col gap-5 border px-10 md:px-16 py-8 sm:py-20">
          <b className="">Quality Assurance:</b>
          <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio enim recusandae fuga beatae officiis eaque laudantium est hic a sint?</p>
        </div>
        <div className="flex flex-col gap-5 border px-10 md:px-16 py-8 sm:py-20">
          <b className="">Convenience:</b>
          <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae asperiores exercitationem, maxime delectus praesentium sed commodi! Omnis, maxime. Nobis, quos.</p>
        </div>
        <div className="flex flex-col gap-5 border px-10 md:px-16 py-8 sm:py-20">
          <b className="">Exceptional customer service:</b>
          <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, sit hic. Molestiae possimus consectetur optio?</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About