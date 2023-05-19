import Image from "next/image";

export const Header = () => {
  return (
    <div>
      <div className="border-b">
        <div className="flex px-[90px] items-center w-container h-[70px] m-auto ">
          <Image
            src="https://www.jdmgarageuk.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/j/d/jdm_designs-03.png"
            alt=""
            width="130"
            height="70"
          />
          <span className="m-auto font-rc-rocket text-5xl">
            Japan&apos;s Timeless Legends
          </span>
        </div>
      </div>
      <ul className="flex w-[1000px] m-auto justify-between items-center font-montserrat">
        <li>
          <a
            href=""
            className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
          >
            <p className="text-xl">search</p>
            <p className="text-2xl leading-7">Cars</p>
          </a>
        </li>
        <li>
          <a
            href=""
            className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
          >
            <p className="text-xl">search</p>
            <p className="text-2xl leading-7">Wheels</p>
          </a>
        </li>
        <li>
          <a
            href=""
            className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
          >
            <p className="text-xl">search</p>
            <p className="text-2xl leading-7">Accessories</p>
          </a>
        </li>
        <li>
          <a
            href=""
            className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
          >
            <p className="text-xl">search</p>
            <p className="text-2xl leading-7">Interesting</p>
          </a>
        </li>
      </ul>
    </div>
  );
};
