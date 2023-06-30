import { logo, menu } from "@/public";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div>
      <div className="border-b">
        <div className="flex px-[90px] items-center w-container h-[70px] m-auto ">
          <Link href="/" className="m-auto font-rc-rocket text-5xl">
            <Image src={logo} alt="" width="130" height="70" />
          </Link>
        </div>
        <div className="absolute right-[15px] top-[15px] xl:hidden">
          <Image src={menu} alt="" width="40" height="40" />
        </div>
      </div>
    </div>
  );
};
