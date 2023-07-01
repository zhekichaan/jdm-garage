"use client";

import {
  accessoriesExample,
  backIcon,
  leftIcon,
  rightIcon,
  wheelExample,
} from "@/public";
import Link from "next/link";
import { button, selectedButton } from "@/public";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carousel.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import Loading from "@/app/loading";

interface AccessoryParams {
  accessory: string;
}

interface Accessory {
  _id: string;
  brand: string;
  name: string;
  price: number;
  category: string;
}

export default function Accessory({ params }: { params: AccessoryParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [accessoryData, setAccessoryData] = useState<Accessory>({
    _id: "",
    brand: "",
    name: "",
    price: 0,
    category: "",
  });
  const [accessoriesList, setAccessoriesList] = useState<Accessory[]>([]);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [amount, setAmount] = useState(1);

  const { accessory } = params;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://enthusiastic-coat-cow.cyclic.app/api/accessories/accessory/${accessory}`
      );
      const res = await data.json();
      setAccessoryData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [accessory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://enthusiastic-coat-cow.cyclic.app/api/accessories/category/?category=${accessoryData.category}&page=1`
        );
        const data = await response.json();
        const filteredData = data
          .filter((item: { _id: string }) => item._id !== accessory)
          .slice(0, 6);
        setAccessoriesList((prevList) => [...prevList, ...filteredData]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessory, accessoryData.category]);

  const isTablet = useMediaQuery("(max-width:1280px)");
  const isMobile = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    if (isTablet) {
      setInfiniteLoop(false);
      setShowArrows(false);
    } else {
      setInfiniteLoop(true);
      setShowArrows(true);
    }
  }, [isTablet]);

  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <button
            className="flex items-center pl-[30px] md:pl-[100px] xl:pl-[10%] py-[30px]"
            onClick={() => router.push("/accessories")}
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
              <Carousel
                infiniteLoop
                showThumbs={false}
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
                          className="text-white w-[20px] md:w-[30px] select-none"
                        />
                      </div>
                      <div
                        className="absolute top-0 left-0 bg-transparent xl:w-[280px] xl:h-[330px] z-10"
                        onClick={clickHandler}
                      ></div>
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
                          className="text-white w-[20px] md:w-[30px] select-none"
                        />
                      </div>
                      <div
                        className="absolute top-0 right-0 bg-transparent xl:w-[280px] xl:h-[330px]"
                        onClick={clickHandler}
                      ></div>
                    </>
                  );
                }}
              >
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
                <Image
                  src={accessoriesExample}
                  alt=""
                  className="pb-[40px] md:pb-[60px] md:px-[40px]"
                />
              </Carousel>
            </div>
            <div className="p-[15px] xl:border xl:rounded">
              <div className="md:p-[10px] divide-y-[1px] xl:w-[426px]">
                <div className="pb-[10px] xl:pb-[20px]">
                  <h3 className="text-[24px] md:text-[36px] mb-[5px]">
                    {accessoryData.brand} {accessoryData.name}
                  </h3>
                  <p className="text-[36px] font-semibold">
                    ${accessoryData.price} CAD
                  </p>
                </div>
                <ul className="py-[15px] xl:py-[20px]">
                  <li className="flex items-center mb-[5px]">
                    <p className="text-[24px] md:text-[32px]">
                      category: {accessoryData.category}
                    </p>
                  </li>
                  <li>
                    <p className="text-[24px] md:text-[32px] mb-[10px]">
                      see other:
                    </p>
                    <Carousel
                      centerMode={isMobile ? false : true}
                      showThumbs={false}
                      showIndicators={true}
                      infiniteLoop={infiniteLoop}
                      showArrows={true}
                      centerSlidePercentage={45}
                      renderArrowPrev={(clickHandler, hasPrev) => {
                        return (
                          <>
                            <div
                              className={`${
                                hasPrev ? "absolute" : "hidden"
                              } md:hidden xl:block top-[50%] -translate-y-2/4 left-[5%] p-[12px] bg-white flex justify-center items-center opacity-1 hover:opacity-100 rounded-full shadow cursor-pointer z-20 hover:brightness-95`}
                              onClick={clickHandler}
                            >
                              <Image
                                src={leftIcon}
                                alt="left"
                                className="text-white w-[20px] select-none"
                              />
                            </div>
                            <div
                              className="absolute top-0 left-0 bg-transparent xl:w-[280px] xl:h-[330px] z-10"
                              onClick={clickHandler}
                            ></div>
                          </>
                        );
                      }}
                      renderArrowNext={(clickHandler, hasNext) => {
                        return (
                          <>
                            <div
                              className={`${
                                hasNext ? "absolute" : "hidden"
                              } md:hidden xl:block top-[50%] -translate-y-2/4 right-[5%] p-[12px] bg-white flex justify-center items-center opacity-1 hover:opacity-100 rounded-full shadow cursor-pointer z-20 hover:brightness-95`}
                              onClick={clickHandler}
                            >
                              <Image
                                src={rightIcon}
                                alt="right"
                                className="text-white w-[20px] select-none"
                              />
                            </div>
                            <div
                              className="absolute top-0 right-0 bg-transparent xl:w-[280px] xl:h-[330px]"
                              onClick={clickHandler}
                            ></div>
                          </>
                        );
                      }}
                      renderIndicator={(
                        onClickHandler,
                        isSelected,
                        index,
                        label
                      ) => {
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
                    >
                      {accessoriesList.map((accessory: Accessory) => (
                        <div
                          key={accessory._id}
                          onClick={() =>
                            router.push("/accessories/" + accessory._id)
                          }
                          className="text-center mb-[40px] w-[160px] md:w-[230px] xl:w-[160px] p-[10px] mx-auto my-[8px] bg-white cursor-pointer shadow rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
                        >
                          <Image
                            src={accessoriesExample}
                            alt="accessory example"
                          />
                          <h3 className="text-[14px] font-light mt-[5px]">
                            {accessory.brand}
                          </h3>
                          <p className="text-[16px] font-medium">
                            {accessory.name}
                          </p>
                          <p className="text-[14px] pr-[10px]">
                            ${accessory.price} CAD
                          </p>
                        </div>
                      ))}
                    </Carousel>
                  </li>
                </ul>
              </div>
              <div className="md:flex">
                <div className="flex h-[75px] min-w-[174px] mb-[10px] md:mb-0 md:mr-[15px] border rounded items-center justify-between">
                  <button
                    className="text-[48px] px-[10px]"
                    onClick={() =>
                      amount >= 2 && setAmount((prevAmount) => prevAmount - 1)
                    }
                  >
                    -
                  </button>
                  <p className="text-[36px]">{amount}</p>
                  <button
                    className="text-[48px] px-[10px]"
                    onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="rounded shadow w-[100%] py-[15px] text-[36px] text-white bg-accent hover:brightness-95 transition-all">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
