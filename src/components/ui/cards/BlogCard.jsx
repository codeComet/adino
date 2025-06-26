import arrowRight from "../../../../public/assets/img/arrow-right.svg";
import Image from "next/image";

const BlogCard = ({ title, summary, image, category, url }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
        <img
          src={image}
          alt={title}
          //  on hover the image should shrink 
          className="w-full h-full rounded-[10px] object-cover transition duration-300 hover:scale-90"
        />
        <div className="absolute top-0 left-0 bg-black/50 w-full h-full rounded-[10px] flex items-end justify-start">
          <p className="text-white text-center px-2 py-1 rounded-full bg-[#4F4F4F] ml-3 mb-3 text-[10px] sm:text-[11px] uppercase font-lato font-medium flex items-center">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#F0B643] rounded-full inline-block mr-2"></span>
            {category}
          </p>
        </div>
      </div>
      <div className="my-4 sm:my-6">
        <p className="text-[#181818] font-lato font-normal text-[18px] sm:text-[20px] md:text-[22px] leading-[1.2] sm:leading-[26.4px]">
          {summary}
        </p>
      </div>
      <div className="mt-3 sm:mt-4 w-fit read-more-btn">
        <a
          href={`/blog/${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-2 text-[#166636] font-lato font-medium py-2 px-5 text-sm rounded-full border border-[#166636] hover:bg-[#166636] hover:text-white transition-colors"
        >
          Read More
          <Image
            src={arrowRight}
            width={30}
            height={80}
            className="w-[25px] sm:w-[35px]"
            alt="arrow-right"
          />
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
