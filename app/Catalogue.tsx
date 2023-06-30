import Link from "next/link";
import { inStock, wheels, accessories, carsTablet } from "../public";
import Image from "next/image";

export const Catalogue = () => {
  return (
    <ul className="flex flex-wrap w-mobile px-[10px] justify-center mx-auto my-[50px] md:w-tablet xl:w-desktop">
      <li className="relative drop-shadow-lg hover:drop-shadow-none md:mb-[20px]">
        <Link href="/cars">
          <Image
            className="md:hidden xl:block rounded md:w-[720px] md:h-[280px] xl:w-[350px] xl:h-[280px]"
            src={inStock}
            alt=""
          />
          <Image
            className="hidden md:block xl:hidden  rounded md:w-[720px] md:h-[280px] xl:w-[350px] xl:h-[280px]"
            src={carsTablet}
            alt=""
          />
          <div className="opacity-1 xl:opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white text-center absolute text-[40px] z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow">
              Cars In Stock
            </p>
            <div className="relative w-[280px] h-[224px] xl:w-[350px] xl:h-[280px] md:w-[720px] md:h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </Link>
      </li>
      <li className="relative drop-shadow-lg hover:drop-shadow-none my-[15px] md:my-[0px] md:mr-[20px] xl:mx-[50px]">
        <Link href="/wheels">
          <Image className="rounded" src={wheels} alt="" />
          <div className="opacity-1 xl:opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white absolute text-[44px] z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow">
              Wheels
            </p>
            <div className="relative w-[280px] h-[224px] xl:w-[350px] xl:h-[280px] md:w-[350px] md:h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </Link>
      </li>
      <li className="relative drop-shadow-lg hover:drop-shadow-none">
        <Link href="/accessories">
          <Image className="rounded" src={accessories} alt="" />
          <div className="opacity-1 xl:opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white absolute text-3xl md:text-4xl z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow">
              Accessories
            </p>
            <div className="relative w-[280px] h-[224px] xl:w-[350px] xl:h-[280px] md:w-[350px] md:h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </Link>
      </li>
    </ul>
  );
};
