import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Image from "next/image";
import fb from "../../../public/assets/img/fb-green.svg";
import ig from "../../../public/assets/img/instagram-green.svg";
import ln from "../../../public/assets/img/ln-green.svg";
import Link from "next/link";

const CommonHeader = () => {
  return (
    <>
      <nav className="h-20 flex items-center absolute w-full z-50 px-6 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="h-full flex items-center justify-between w-full mx-auto max-w-7xl">
          <Link href="/">
            <Logo type="main" />
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:flex" type="main" />

          <div className="flex items-center gap-6">
            {/* Social Icons */}
            {/* <div className="hidden lg:flex items-center space-x-6 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={fb} alt="Facebook" width={40} height={40} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ln} alt="LinkedIn" width={40} height={40} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ig} alt="Instagram" width={40} height={40} />
              </a>
            </div> */}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet type="main" />
            </div>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default CommonHeader;
