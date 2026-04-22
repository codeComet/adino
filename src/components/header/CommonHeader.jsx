import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";

// import Image from "next/image";
// import fb from "../../../public/assets/img/fb-green.svg";
// import ig from "../../../public/assets/img/instagram-green.svg";
// import ln from "../../../public/assets/img/ln-green.svg";

const CommonHeader = ({ logoMedia }) => {
  return (
    <>
      <nav className="absolute z-50 my-5 flex h-20 w-full items-center px-4 sm:px-6">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4">
          <Link href="/">
            <Logo media={logoMedia} />
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden lg:flex" />

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
            <div className="lg:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CommonHeader;
