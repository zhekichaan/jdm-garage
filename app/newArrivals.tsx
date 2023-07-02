import { CarCard } from "./CarCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carousel.css";
import { Carousel } from "react-responsive-carousel";
import { button, leftIcon, rightIcon, selectedButton } from "@/public";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Loading from "./loading";

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  description: string;
  accessories: string[];
  photos: string[];
  engine: string;
}

export const NewArrivals = () => {
  const [centerMode, setCenterMode] = useState(false);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const [carsList, setCarsList] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://enthusiastic-coat-cow.cyclic.app/api/cars/featured"
        );
        const data = await response.json();
        console.log(data);
        setCarsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const isTablet = useMediaQuery("(max-width:1280px)");

  useEffect(() => {
    if (isTablet) {
      setCenterMode(false);
      setInfiniteLoop(false);
      setShowIndicators(true);
      setShowArrows(false);
    } else {
      setCenterMode(true);
      setInfiniteLoop(true);
      setShowIndicators(true);
      setShowArrows(true);
    }
  }, [isTablet]);

  return (
    <>
      <div className="hidden md:block my-[50px] pb-[20px] bg-bg">
        <h2 className="text-center text-[40px] py-[30px] uppercase">
          New Arrivals
        </h2>
        {carsList.length > 0 ? (
          <Carousel
            showArrows={showArrows}
            infiniteLoop={infiniteLoop}
            centerMode={centerMode}
            showIndicators={showIndicators}
            showStatus={false}
            showThumbs={false}
            centerSlidePercentage={55}
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <>
                  <div
                    className={`${
                      hasPrev ? "absolute" : "hidden"
                    } bottom-0 left-[37%] p-[12px] bg-white flex justify-center items-center opacity-1 hover:opacity-100 rounded-full shadow cursor-pointer z-20 hover:brightness-95`}
                    onClick={clickHandler}
                  >
                    <Image
                      src={leftIcon}
                      alt="left"
                      className="text-white w-[20px] h-[20px] select-none"
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
                    } bottom-0 right-[37%] p-[12px] bg-white flex justify-center items-center opacity-1 hover:opacity-100 rounded-full shadow cursor-pointer z-20 hover:brightness-95`}
                    onClick={clickHandler}
                  >
                    <Image
                      src={rightIcon}
                      alt="right"
                      className="text-white w-[20px] h-[20px] select-none"
                    />
                  </div>
                  <div
                    className="absolute top-0 right-0 bg-transparent xl:w-[280px] xl:h-[330px]"
                    onClick={clickHandler}
                  ></div>
                </>
              );
            }}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const style = isSelected ? selectedButton : button;
              return (
                <Image
                  src={style}
                  onClick={onClickHandler}
                  className="w-[20px] ml-[10px] pt-[20px]"
                  width={20}
                  alt="button"
                />
              );
            }}
          >
            {carsList.map(
              (car: {
                _id: string;
                make: string;
                model: string;
                year: number;
                price: number;
                mileage: number;
                fuel: string;
                transmission: string;
                photos: string[];
                engine: string;
              }) => (
                <CarCard
                  key={car._id}
                  id={car._id}
                  make={car.make}
                  model={car.model}
                  year={car.year}
                  price={car.price}
                  mileage={car.mileage}
                  fuel={car.fuel}
                  engine={car.engine}
                  transmission={car.transmission}
                  photos={car.photos}
                />
              )
            )}
          </Carousel>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
