import { carExample } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { Key, useEffect } from "react";

interface Props {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  engine: string;
  photos: string[];
}

export const CarCard = ({
  id,
  make,
  model,
  year,
  price,
  mileage,
  fuel,
  transmission,
  engine,
  photos,
}: Props) => {
  const baseUrl = "cars/";
  return (
    <div className="w-[700px] mx-auto mb-[50px] xl:mb-[60px] text-center">
      <div className="rounded w-full h-full bg-white drop-shadow-lg p-[15px]">
        <Link
          href={baseUrl + id}
          className="flex justify-center items-center content-center divide-x-[1px] divide-black text-right"
        >
          <div className="w-[400px] h-[300px] mr-[15px] rounded-tl rounded-bl">
            <Image
              src={photos[0]}
              alt="car"
              width={400}
              height={100}
              className="object-cover h-full"
            />
          </div>
          <div className="pl-[15px] h-[300px] flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-[10px]">
              <Image src={photos[1]} alt="car" width={100} height={50} />
              <Image src={photos[2]} alt="car" width={100} height={50} />
              <Image src={photos[3]} alt="car" width={100} height={50} />
              <Image src={photos[4]} alt="car" width={100} height={50} />
            </div>
            <div>
              <h3 className="text-[26px] font-semibold">
                {make} {model}
              </h3>
              <p className="text-2xl">${price} CAD</p>
              <p className="text-base">{engine}</p>
              <ul className="flex divide-x-[1px] divide-black justify-end text-base mx-auto">
                <li className="pr-[8px]">{mileage} km</li>
                <li className="px-[8px]">{fuel}</li>
                <li className="pl-[8px]">{transmission}</li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
