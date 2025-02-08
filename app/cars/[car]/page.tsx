/* eslint-disable @next/next/no-img-element */
"use client";

import {
  backIcon,
  button,
  carExample,
  carMap,
  checkBox,
  checkBoxChecked,
  fuelIcon,
  gearboxIcon,
  leftIcon,
  locationIcon,
  mileageIcon,
  rightIcon,
  selectedButton,
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
  capacity: string;
  transmission: string;
  engine: string;
  engineType: string;
  drive: string;
  photos: string[];
  description: string;
  quantity: number;
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
    capacity: "",
    transmission: "",
    engine: "",
    engineType: "",
    drive: "",
    photos: [],
    description: "",
    quantity: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://jdm-garage-backend-674d69810b7f.herokuapp.com/api/cars/car/${car}`
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

          <div className="xl:flex justify-between mx-auto md:w-[668px] xl:w-[1176px] md:border md:rounded xl:border-none">
            <div className="xl:w-[700px] px-[15px] pt-[15px]">
              <Carousel
                infiniteLoop
                showStatus={false}
                showThumbs={true}
                showIndicators={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  const style = isSelected ? selectedButton : button;
                  return (
                    <Image
                      src={style}
                      onClick={onClickHandler}
                      className="w-[10px] md:w-[15px] ml-[10px] pt-[20px]"
                      width={20}
                      alt="button"
                    />
                  );
                }}
                renderArrowPrev={(clickHandler, hasPrev) => {
                  return (
                    <>
                      <div
                        className={`${
                          hasPrev ? "absolute" : "hidden"
                        } hidden md:block bottom-[2px] left-[5%] md:left-0 md:bottom-[50%] md:translate-y-2/4 md:py-[75px] md:px-[12px] bg-transparent flex justify-center items-center opacity-1 hover:opacity-100 rounded-full cursor-pointer z-20 xl:hover:scale-90`}
                        onClick={clickHandler}
                      >
                        <Image
                          src={leftIcon}
                          alt="left"
                          className="text-white w-[20px] md:w-[50px] select-none drop-shadow-md"
                        />
                      </div>
                    </>
                  );
                }}
                renderArrowNext={(clickHandler, hasNext) => {
                  return (
                    <>
                      <div
                        className={`${
                          hasNext ? "absolute" : "hidden"
                        } hidden md:block bottom-[2px] right-[5%] md:right-0 md:bottom-[50%] md:translate-y-2/4 md:py-[75px] md:px-[12px] bg-transparent flex justify-center items-center opacity-1 hover:opacity-100 rounded-full cursor-pointer z-20 xl:hover:scale-90`}
                        onClick={clickHandler}
                      >
                        <Image
                          src={rightIcon}
                          alt="right"
                          className="text-white w-[20px] md:w-[50px] select-none drop-shadow-md"
                        />
                      </div>
                    </>
                    //
                  );
                }}
              >
                {carData.photos.map((photo) => (
                  <img
                    src={photo}
                    key={photo}
                    alt=""
                    width={650}
                    height={100}
                  />
                ))}
              </Carousel>
            </div>
            <div className="p-[15px] bg-white text-black md:p-[10px] xl:w-[426px]">
              <div className="pb-4">
                <div className="flex justify-between border-2 border-accent border-collapse">
                  <div className="px-1 pt-1">
                    <h3 className="text-secondary font-bold">車種</h3>
                    <h4 className="uppercase text-xl">
                      {carData.make} {carData.model}
                    </h4>
                  </div>
                  <div className="px-1 pt-1 border-l-2 border-accent">
                    <h3 className="text-secondary font-bold">年</h3>
                    <h4 className="text-2xl px-3">{carData.year}</h4>
                  </div>
                </div>
                <div className="flex justify-between border-x-2 border-b-2 border-accent border-collapse">
                  <div className="px-1 pt-1">
                    <h3 className="text-secondary font-bold">マイレージ</h3>
                    <h4 className="text-2xl">
                      {carData.mileage.toLocaleString("en-US")} km
                    </h4>
                  </div>
                  <div className="px-1 pt-1 border-l-2 border-accent">
                    <h3 className="text-secondary font-bold">価格</h3>
                    <h4 className="text-2xl px-3">
                      ¥{(carData.price * 105).toLocaleString("en-US")}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="pb-6  ">
                <div className="flex justify-between border-2 border-accent border-collapse">
                  <div className="px-1 pt-1 text-left">
                    <h3 className="text-secondary font-bold">エンジン</h3>
                    <h4 className="uppercase text-2xl">{carData.engine}</h4>
                  </div>
                  <div className="flex">
                    <div className="px-1 pt-1 border-l-2 border-accent">
                      <h3 className="text-secondary font-bold">排気量</h3>
                      <h4 className="text-2xl px-3">{carData.capacity} L</h4>
                    </div>
                    <div className="px-1 pt-1 border-l-2 border-accent">
                      <h3 className="text-secondary font-bold">シフト</h3>
                      <h4 className="text-2xl ">{carData.transmission}</h4>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between border-x-2 border-b-2 border-accent border-collapse">
                  <div className="px-1 pt-1">
                    <h3 className="text-secondary font-bold">エンジン種類</h3>
                    <h4 className="text-2xl">{carData.engineType}</h4>
                  </div>
                  <div className="px-1 pt-1 border-l-2 border-accent">
                    <h3 className="text-secondary font-bold">
                      ドライブトレイン
                    </h3>
                    <h4 className="text-2xl ">{carData.drive}</h4>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-secondary font-bold">検査官のメモ</h3>
                  <p className="text-xl pr-5 leading-[45px] underline underline-offset-8 decoration-dotted">
                    {carData.description}
                  </p>
                </div>

                <Image src={carMap} alt="car map" className="w-[150px]" />
              </div>
              <button className="rounded shadow w-[100%] py-[15px] mt-[40px] text-[36px] text-white bg-accent hover:brightness-95 transition-all">
                Get a Quote
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
