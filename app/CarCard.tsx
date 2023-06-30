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
  location: string;
  transmission: string;
}

export const CarCard = ({
  id,
  make,
  model,
  year,
  price,
  mileage,
  fuel,
  location,
  transmission,
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
              src={carExample}
              alt="car"
              width={400}
              className="object-cover h-full"
            />
          </div>
          <div className="pl-[15px] py-[15px] h-[300px] flex flex-col justify-end">
            <h3 className="text-2xl font-semibold">
              {year} {make} {model}
            </h3>
            <p className="text-2xl">${price} CAD</p>
            <p className="text-base">{location}</p>
            <ul className="flex divide-x-[1px] divide-black justify-end text-base">
              <li className="pr-[8px]">{mileage} km</li>
              <li className="px-[8px]">{fuel}</li>
              <li className="pl-[8px]">{transmission}</li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};
