import { logo, menu } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "./Cart";

export const Header = () => {
  return (
    <div>
      <div className="border-b">
        <div className="flex px-[90px] items-center w-container h-[70px] m-auto ">
          <Link href="/" className="mx-auto text-5xl">
            {/* <Image src={logo} alt="" width="130" height="70" /> */}
            <div className="text-3xl">JDM GARAGE</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
