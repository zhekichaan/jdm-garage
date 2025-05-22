"use client";

import {
  backIcon,
  leftIcon,
  rightIcon,
  wheelExample,
  wheelPlaceholder,
} from "@/public";
import Link from "next/link";
import { button, selectedButton } from "@/public";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carousel.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import Loading from "@/app/loading";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

interface WheelParams {
  wheel: string;
}

interface Wheel {
  _id: string;
  brand: string;
  name: string;
  price: number;
  colors: string[];
  size: string;
  sizes: string[];
  photos: string[];
  quantity: number;
}

export default function Wheel({ params }: { params: WheelParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [wheelData, setWheelData] = useState<Wheel>({
    _id: "",
    brand: "",
    name: "",
    price: 0,
    colors: [],
    size: "",
    sizes: [],
    photos: [],
    quantity: 1,
  });
  const [wheelsList, setWheelsList] = useState<Wheel[]>([]);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { wheel } = params;

  const router = useRouter();

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://jdm-garage-backend-674d69810b7f.herokuapp.com/api/wheels/wheel/${wheel}`
      );
      const res = await data.json();
      res.quantity = 1;
      setWheelData(res);
      setColor(res.colors[0]);
      setPrice(res.price);
      setIsLoading(false);
    };

    fetchData();
  }, [wheel]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://jdm-garage-backend-674d69810b7f.herokuapp.com/api/wheels/brand/?brand=${wheelData.brand}`
        );
        const data = await response.json();
        const filteredData = data.filter(
          (item: { _id: string }) => item._id !== wheel
        );

        setWheelsList(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [wheel, wheelData]);

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

  const handleSizeChange = (e: {
    target: {
      options: any;
      value: SetStateAction<string>;
    };
  }) => {
    setSize(e.target.value);
    const newPrice = wheelData.price + 33 * e.target.options.selectedIndex;
    setPrice(newPrice);
  };

  const handleColorChange = (e: {
    target: {
      options: any;
      value: SetStateAction<string>;
    };
  }) => {
    setColor(e.target.value);
    setSelectedIndex(e.target.options.selectedIndex);
  };

  const handleSubmit = () => {
    const newData = {
      ...wheelData,
      additional: color,
      size: size,
      price: price,
      photo: wheelData.photos[selectedIndex],
      quantity: amount,
    };
    dispatch(addToCart(newData));
  };

  const dispatch = useDispatch();

  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <button
            className="flex items-center pl-[30px] md:pl-[100px] xl:pl-[10%] py-[30px]"
            onClick={() => router.push("/wheels")}
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
                {wheelData.photos.map((photo) => (
                  <Image
                    key={photo}
                    src={wheelPlaceholder}
                    width={460}
                    height={460}
                    alt=""
                  />
                ))}
              </Carousel>
            </div>
            <div className="p-[15px] xl:border xl:rounded">
              <div className="md:p-[10px] divide-y-[1px] xl:w-[426px]">
                <div className="pb-[10px] xl:pb-[20px]">
                  <h3 className="text-[24px] md:text-[36px] mb-[5px]">
                    {wheelData.brand} {wheelData.name}
                  </h3>
                  <p className="text-[36px] font-semibold">${price} CAD</p>
                </div>
                <ul className="py-[15px] xl:py-[20px]">
                  <li className="flex items-center mb-[5px]">
                    <p className="text-[24px] md:text-[32px]">
                      size:{" "}
                      <select
                        className="ml-3"
                        onChange={handleSizeChange}
                        value={size}
                      >
                        {wheelData.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </p>
                  </li>
                  <li className="flex items-center mb-[5px]">
                    <p className="text-[24px] md:text-[32px]">
                      color:
                      <select
                        className="ml-3"
                        onChange={handleColorChange}
                        value={color}
                      >
                        {wheelData.colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </p>
                  </li>
                  <li>
                    <p className="text-[24px] md:text-[32px] mb-[10px]">
                      see other:
                    </p>
                    {wheelsList.length > 1 && (
                      <Carousel
                        centerMode={isMobile ? false : true}
                        showThumbs={false}
                        infiniteLoop
                        showIndicators={true}
                        showArrows={true}
                        centerSlidePercentage={45}
                        renderArrowPrev={(clickHandler, hasPrev) => {
                          return (
                            <>
                              <div
                                className={`${
                                  hasPrev ? "absolute" : "hidden"
                                } md:hidden xl:block top-[50%] -translate-y-2/4 left-[5%] p-[12px] bg-secondary hover:brightness-125 flex justify-center items-center opacity-1 rounded-full shadow cursor-pointer z-20`}
                                onClick={clickHandler}
                              >
                                <Image
                                  src={leftIcon}
                                  alt="left"
                                  className="text-white w-[20px] select-none"
                                />
                              </div>
                              <div
                                className="absolute top-0 left-0 bg-transparent xl:w-[100px] xl:h-[330px] z-10"
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
                                } md:hidden xl:block top-[50%] -translate-y-2/4 right-[5%] p-[12px] bg-secondary hover:brightness-125 flex justify-center items-center opacity-1 rounded-full shadow cursor-pointer z-20`}
                                onClick={clickHandler}
                              >
                                <Image
                                  src={rightIcon}
                                  alt="right"
                                  className="text-white w-[20px] select-none"
                                />
                              </div>
                              <div
                                className="absolute top-0 right-0 bg-transparent xl:w-[100px] xl:h-[330px]"
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
                        {wheelsList
                          .filter((wheel) => wheel.brand === wheelData.brand)
                          .map((wheel: Wheel) => (
                            <div
                              key={wheel._id}
                              onClick={() =>
                                router.push("/wheels/" + wheel._id)
                              }
                              className="text-center mb-[40px] w-[160px] md:w-[230px] xl:w-[160px] p-[10px] mx-auto my-[8px] bg-white cursor-pointer shadow rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
                            >
                              <Image
                                src={wheelPlaceholder}
                                alt="wheel example"
                                width={140}
                                height={140}
                              />
                              <h3 className="text-[14px] font-light mt-[5px]">
                                {wheel.brand} Wheels
                              </h3>
                              <p className="text-[16px] font-medium">
                                {wheel.name}
                              </p>
                              <div className="flex justify-center divide-x-[1px]">
                                <p className="text-[14px] pr-[10px]">
                                  ${wheel.price} CAD
                                </p>
                                <p className="text-[14px] pl-[10px]">
                                  {wheel.size}&quot;
                                </p>
                              </div>
                            </div>
                          ))}
                      </Carousel>
                    )}
                  </li>
                </ul>
              </div>
              <div className="md:flex">
                <div className="flex h-[75px] min-w-[174px] mb-[10px] md:mb-0 md:mr-[15px] border rounded items-center justify-between">
                  <button
                    className="text-[48px] px-[10px]"
                    onClick={() => amount >= 2 && setAmount(amount - 1)}
                  >
                    -
                  </button>
                  <p className="text-[36px]">{amount}</p>
                  <button
                    className="text-[48px] px-[10px]"
                    onClick={() => setAmount(amount + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleSubmit()}
                  className="rounded shadow w-[100%] py-[15px] text-[36px] text-white bg-accent hover:brightness-95 transition-all"
                >
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
