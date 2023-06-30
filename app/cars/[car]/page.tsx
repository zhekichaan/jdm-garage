"use client";

import {
  backIcon,
  carExample,
  checkBox,
  checkBoxChecked,
  fuelIcon,
  gearboxIcon,
  locationIcon,
  mileageIcon,
} from "@/public";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carousel.css";
import { useMediaQuery } from "@mui/material";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

interface CarParams {
  car: string;
}

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  accessories: string[];
}

export default function Car({ params }: { params: CarParams }) {
  const { car } = params;
  const router = useRouter();

  const [carData, setCarData] = useState<Car>({
    _id: "",
    make: "",
    model: "",
    year: 0,
    price: 0,
    mileage: 0,
    fuel: "",
    transmission: "",
    location: "",
    accessories: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://enthusiastic-coat-cow.cyclic.app/api/cars/car/${car}`
      );
      const res = await data.json();
      setCarData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [car]);

  const isDesktop = useMediaQuery("(min-width:1280px)");

  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <button
            className="flex items-center pl-[30px] md:pl-[100px] xl:pl-[10%] py-[30px]"
            onClick={() => router.push("/cars")}
          >
            <Image
              src={backIcon}
              alt="go back icon"
              className="w-[32px] mr-[10px]"
            />
            <span className="text-[32px]">Go Back</span>
          </button>

          <div className="xl:flex justify-between mx-auto md:w-[668px] xl:w-[1176px] mt-[50px] md:border md:rounded xl:border-none">
            <div className="xl:w-[650px] px-[15px] pt-[15px]">
              <Carousel infiniteLoop showThumbs={false}>
                <Image src={carExample} alt="" />
                <Image src={carExample} alt="" />
                <Image src={carExample} alt="" />
                <Image src={carExample} alt="" />
                <Image src={carExample} alt="" />
                <Image src={carExample} alt="" />
              </Carousel>
            </div>
            <div className="p-[15px] xl:border xl:rounded">
              <div className="md:p-[10px] divide-y-[1px] xl:w-[426px]">
                <div className="pb-[10px] xl:pb-[20px]">
                  <h3 className="text-[24px] md:text-[36px] mb-[5px]">
                    {carData.year} {carData.make} {carData.model}
                  </h3>
                  <p className="text-[36px] font-semibold">
                    ${carData.price} CAD
                  </p>
                </div>
                <ul className="py-[15px] xl:py-[20px]">
                  <li className="flex items-center mb-[5px]">
                    <Image
                      src={locationIcon}
                      alt=""
                      className="w-[32px] h-[32px] mr-[10px]"
                    />
                    <p className="text-[24px] md:text-[36px]">
                      {carData.location}
                    </p>
                  </li>
                  <li className="flex items-center mb-[5px]">
                    <Image
                      src={mileageIcon}
                      alt=""
                      className="w-[32px] h-[32px] mr-[10px]"
                    />
                    <p className="text-[24px] md:text-[36px]">
                      {carData.mileage} km
                    </p>
                  </li>
                  <li className="flex items-center mb-[5px]">
                    <Image
                      src={gearboxIcon}
                      alt=""
                      className="w-[32px] h-[32px] mr-[10px]"
                    />
                    <p className="text-[24px] md:text-[36px]">
                      {carData.transmission}
                    </p>
                  </li>
                  <li className="flex items-center">
                    <Image
                      src={fuelIcon}
                      alt=""
                      className="w-[32px] h-[32px] mr-[10px]"
                    />
                    <p className="text-[24px] md:text-[36px]">{carData.fuel}</p>
                  </li>
                </ul>
                <ul className="md:flex justify-between pt-[15px] xl:pt-[20px] text-[20px]">
                  <li>
                    <p className="text-[24px] mb-[15px] text-center font-medium">
                      Comfort
                    </p>
                    <ul className="">
                      <li className="flex mb-[7px]">
                        <Image
                          src={
                            carData.accessories.includes("A/C")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>A/C</p>
                      </li>
                      <li className="flex">
                        <Image
                          src={
                            carData.accessories.includes("Power Steering")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>
                          Power {isDesktop ? <br /> : ""}
                          Steering
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="mt-[15px] md:mt-0 text-[24px] mb-[15px] text-center font-medium">
                      Safety
                    </p>
                    <ul>
                      <li className="flex mb-[7px]">
                        <Image
                          src={
                            carData.accessories.includes("ABS")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>ABS</p>
                      </li>
                      <li className="flex">
                        <Image
                          src={
                            carData.accessories.includes("Airbag")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>Airbag</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="mt-[15px] md:mt-0 text-[24px] mb-[15px] text-center font-medium">
                      Others
                    </p>
                    <ul>
                      <li className="flex mb-[7px]">
                        <Image
                          src={
                            carData.accessories.includes("AM/FM")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>AM/FM</p>
                      </li>
                      <li className="flex">
                        <Image
                          src={
                            carData.accessories.includes("Power Windows")
                              ? checkBoxChecked
                              : checkBox
                          }
                          alt=""
                          className="w-[24px] h-[24px] mr-[10px]"
                        />
                        <p>
                          Power {isDesktop ? <br /> : ""}
                          Windows
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <button className="rounded shadow w-[100%] py-[15px] mt-[20px] text-[36px] text-white bg-accent hover:brightness-95 transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
