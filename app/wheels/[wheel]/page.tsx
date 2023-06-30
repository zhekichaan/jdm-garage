"use client";

import { backIcon, wheelExample } from "@/public";
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

interface WheelParams {
  wheel: string;
}

interface Wheel {
  _id: string;
  brand: string;
  name: string;
  price: number;
  color: string;
  size: string;
}

export default function Wheel({ params }: { params: WheelParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [wheelData, setWheelData] = useState<Wheel>({
    _id: "",
    brand: "",
    name: "",
    price: 0,
    color: "",
    size: "",
  });
  const [wheelsList, setWheelsList] = useState<Wheel[]>([]);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [amount, setAmount] = useState(1);
  const { wheel } = params;

  const router = useRouter();

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://enthusiastic-coat-cow.cyclic.app/api/wheels/wheel/${wheel}`
      );
      const res = await data.json();
      setWheelData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [wheel]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://enthusiastic-coat-cow.cyclic.app/api/wheels/brand/?brand=${wheelData.brand}&page=1`
        );
        const data = await response.json();
        const filteredData = data
          .filter((item: { _id: string }) => item._id !== wheel)
          .slice(0, 6);
        setWheelsList((prevList) => [...prevList, ...filteredData]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [wheelData]);

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
              <Carousel infiniteLoop showThumbs={false}>
                <Image src={wheelExample} alt="" />
                <Image src={wheelExample} alt="" />
                <Image src={wheelExample} alt="" />
                <Image src={wheelExample} alt="" />
                <Image src={wheelExample} alt="" />
                <Image src={wheelExample} alt="" />
              </Carousel>
            </div>
            <div className="p-[15px] xl:border xl:rounded">
              <div className="md:p-[10px] divide-y-[1px] xl:w-[426px]">
                <div className="pb-[10px] xl:pb-[20px]">
                  <h3 className="text-[24px] md:text-[36px] mb-[5px]">
                    {wheelData.brand} {wheelData.name}
                  </h3>
                  <p className="text-[36px] font-semibold">
                    ${wheelData.price} CAD
                  </p>
                </div>
                <ul className="py-[15px] xl:py-[20px]">
                  <li className="flex items-center mb-[5px]">
                    <p className="text-[24px] md:text-[32px]">
                      size: {wheelData.size}
                    </p>
                  </li>
                  <li className="flex items-center mb-[5px]">
                    <p className="text-[24px] md:text-[32px]">
                      color: {wheelData.color}
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
                      showArrows={showArrows}
                      centerSlidePercentage={45}
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
                      {wheelsList.map((wheel: Wheel) => (
                        <div
                          key={wheel._id}
                          onClick={() => router.push("/wheels/" + wheel._id)}
                          className="text-center mb-[40px] w-[160px] md:w-[230px] xl:w-[160px] p-[10px] mx-auto my-[8px] bg-white cursor-pointer shadow rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
                        >
                          <Image src={wheelExample} alt="wheel example" />
                          <h3 className="text-[14px] font-light mt-[5px]">
                            {wheel.brand} Wheels
                          </h3>
                          <p className="text-[16px] font-medium">
                            {wheel.brand} {wheel.name}
                          </p>
                          <div className="flex justify-center divide-x-[1px]">
                            <p className="text-[14px] pr-[10px]">
                              ${wheel.price} CAD
                            </p>
                            <p className="text-[14px] pl-[10px]">
                              {wheel.size}
                            </p>
                          </div>
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
