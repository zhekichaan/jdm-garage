import { InStock, Wheels, Accesories } from "../public";
import Image from "next/image";

export const Catalogue = () => {
  return (
    <ul className="flex w-container justify-center mx-auto my-[50px]">
      <li className="drop-shadow-lg hover:drop-shadow-none">
        <a href="">
          <Image className="rounded" src={InStock} alt="" />
          <div className="opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white text-center absolute text-[40px] z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow-catalogue">
              Cars In Stock
            </p>
            <div className="relative w-[350px] h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </a>
      </li>
      <li className="drop-shadow-lg hover:drop-shadow-none mx-[50px]">
        <a href="">
          <Image className="rounded" src={Wheels} alt="" />
          <div className="opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white absolute text-[44px] z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow-catalogue">
              Wheels
            </p>
            <div className="relative w-[350px] h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </a>
      </li>
      <li className="drop-shadow-lg hover:drop-shadow-none">
        <a href="">
          <Image className="rounded" src={Accesories} alt="" />
          <div className="opacity-0  transition-all  ease-in-out absolute top-0 hover:opacity-100">
            <p className="text-white absolute text-4xl z-10 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 font-excluded drop-shadow-catalogue">
              Accessories
            </p>
            <div className="relative w-[350px] h-[280px] bg-black opacity-30 z-0 rounded"></div>
          </div>
        </a>
      </li>
    </ul>
  );
};
