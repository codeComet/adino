import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Image from "next/image";
import fb from "../../../public/assets/img/fb.svg";
import ig from "../../../public/assets/img/ig.svg";
import ln from "../../../public/assets/img/linkedin.svg";
import Link from "next/link";

const HomeHeader = () => {
  return (
    <>
      <nav className="h-20 flex items-center absolute w-full z-50 px-6">
        <div className="h-full flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <Link href="/">
            <Logo type="home"/>
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:flex" />

          <div className="flex items-center gap-6">
            {/* Social Icons */}
            <div className="hidden lg:flex items-center space-x-6 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={fb} alt="Facebook" width={24} height={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ln} alt="LinkedIn" width={24} height={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ig} alt="Instagram" width={24} height={24} />
              </a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet type="home"/>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;
