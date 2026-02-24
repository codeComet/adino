import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

const ContactInfo = ({ contactInfo }) => {
  return (
    <div className="py-20 flex justify-around items-center flex-wrap gap-10 md:gap-0">
      {contactInfo &&
        contactInfo.map((item) => (
          <Link key={item.id} href={item?.url}>
            <div className="flex flex-col gap-4.5 items-center justify-center">
              <Image
                src={getStrapiMedia(item?.image?.url)}
                alt={item?.title}
                width={50}
                height={50}
              />
              <h3 className="font-sequel-light text-lg leading-[30px] tracking-[-0.5px]">
                {item?.title}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ContactInfo;
