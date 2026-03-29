import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import Image from "next/image";
import fb from "../../../public/assets/img/fb.svg";
import ig from "../../../public/assets/img/ig.svg";
import ln from "../../../public/assets/img/linkedin.svg";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // make sure this package is installed

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6 text-white" />
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:w-1/2 p-6">
        {/* Required for accessibility */}
        <DialogTitle asChild>
          <VisuallyHidden>Mobile Navigation</VisuallyHidden>
        </DialogTitle>

        <div className="flex flex-col justify-between min-h-screen">
          {/* Top: Mobile Nav */}
          <div>
            <NavMenu variant="mobile" />
          </div>

          {/* Bottom: Social Icons */}
          <div className="flex items-center gap-6 mt-8">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
