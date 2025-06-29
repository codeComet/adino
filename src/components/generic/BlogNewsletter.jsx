
import fb from "../../../public/assets/img/fb-1.svg"
import link from "../../../public/assets/img/link.svg"
import x from "../../../public/assets/img/x.svg"
import ln from "../../../public/assets/img/ln-1.svg"
import Image from "next/image"

const BlogNewsletter = () => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow border flex flex-col gap-6 sticky top-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl md:leading-10 font-semibold mb-1">
          Subscribe to newsletter
        </h2>
        <p className="text-[#53535C] text-sm md:text-base md:leading-6">
          Subscribe to receive the latest blog posts to your inbox every week.
        </p>
      </div>
      <form className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white cursor-pointer py-2 font-medium hover:bg-[#AE9056] transition rounded-full"
        >
          Submit
        </button>
      </form>
      <p className="text-xs md:text-sm md:leading-6 text-[#707079]">
        By subscribing you agree to with our{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
      <hr />
      <div>
        <span className="text-xs text-gray-500">SHARE THIS POST</span>
        <div className="flex gap-3 mt-2">
          <a
            href="#"
            aria-label="Copy link"
            className="rounded-full border hover:bg-gray-100"
          >
            <Image src={link} alt="link" width={32} height={32} />
          </a>
          <a
            href="#"
            aria-label="Share on Facebook"
            className="rounded-full border hover:bg-gray-100"
          >
            <Image src={fb} alt="fb" width={32} height={32} />
          </a>
          <a
            href="#"
            aria-label="Share on X"
            className="rounded-full border hover:bg-gray-100"
          >
            <Image src={x} alt="x" width={32} height={32} />
          </a>
          <a
            href="#"
            aria-label="Share on LinkedIn"
            className="rounded-full border hover:bg-gray-100"
          >
            <Image src={ln} alt="ln" width={32} height={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogNewsletter;
