"use client";

import { carsBanner, carExample, filterIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

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

export default function Cars() {
  const value = localStorage?.getItem("make") || "";

  const [carMake, setCarMake] = useState(value);
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!lastPage) {
          setIsLoading(true);
          if (carMake !== "") {
            const response = await fetch(
              `https://enthusiastic-coat-cow.cyclic.app/api/cars/make/?make=${carMake}&page=${page}`
            );
            const data = await response.json();
            setCarsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if ((await data).length < 6) {
              setLastPage(true);
            } else {
              setLastPage(false);
            }
          } else {
            const response = await fetch(
              `https://enthusiastic-coat-cow.cyclic.app/api/cars?page=${page}`
            );
            const data = await response.json();
            setCarsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if ((await data).length < 6) {
              setLastPage(true);
            } else {
              setLastPage(false);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [carMake, lastPage, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !lastPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    });

    const testDiv = document.getElementById("test");
    if (testDiv) {
      observer.observe(testDiv);
    }

    return () => {
      if (testDiv) {
        observer.unobserve(testDiv);
      }
    };
  }, [lastPage]);

  const handleFilterOpen = () => {
    setIsVisible((prevState) => !prevState);
    if (!isVisible) {
      document.body.classList.add(`overflow-hidden`);
    } else {
      document.body.classList.remove(`overflow-hidden`);
    }
  };

  const handleMakeChoice = async (carMake: string) => {
    setIsVisible(false);
    document.body.classList.remove(`overflow-hidden`);
    setLastPage(false);
    setIsLoading(true);
    setCarMake(carMake);
    setCarsList([]);
    setPage(1);
    localStorage.setItem("make", carMake);
  };

  return (
    <>
      <div className="w-screen h-[100px] max-w-[1920px] md:h-[200px] relative mx-auto">
        <Image
          src={carsBanner}
          alt="cars banner"
          className="object-cover h-[100px] md:h-[200px] w-screen brightness-50"
        />
        <h2 className="absolute text-white text-3xl md:text-6xl top-[50%] -translate-y-2/4 right-[10%] xl:right-[20%]">
          Cars In Stock
        </h2>
      </div>
      <div className="flex relative xl:w-desktop md:px-[25px] pt-[70px] xl:pt-[100px] mx-auto xl:justify-between justify-center">
        <button
          className="flex xl:hidden items-center bg-accent absolute top-[15px] text-white rounded-full px-4 py-2"
          onClick={() => handleFilterOpen()}
        >
          <Image src={filterIcon} alt="filter" className="w-[20px] mr-[10px]" />
          <p>Filters</p>
        </button>
        <div
          className={
            isVisible
              ? "absolute left-0 z-10 bg-white w-[100%] text-center pb-[500px]"
              : "" + " hidden xl:block divide-y w-[220px] px-[15px]"
          }
        >
          <h3 className="text-[32px] pb-[5px]">Make</h3>
          <ul className="text-[36px] xl:text-[20px] flex flex-col gap-[10px] pt-[10px]">
            <li
              onClick={() => handleMakeChoice("Toyota")}
              className={
                carMake === "Toyota"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Toyota
            </li>
            <li
              onClick={() => handleMakeChoice("Nissan")}
              className={
                carMake === "Nissan"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Nissan
            </li>
            <li
              onClick={() => handleMakeChoice("Mazda")}
              className={
                carMake === "Mazda"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Mazda
            </li>
            <li
              onClick={() => handleMakeChoice("Lexus")}
              className={
                carMake === "Lexus"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Lexus
            </li>
            <li
              onClick={() => handleMakeChoice("Honda")}
              className={
                carMake === "Honda"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Honda
            </li>
            <li
              onClick={() => handleMakeChoice("Mitsubishi")}
              className={
                carMake === "Mitsubishi"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Mitsubishi
            </li>
          </ul>
        </div>
        <div className="xl:w-[940px]">
          {carsList.length > 1 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
              {carsList.map((car: Car) => (
                <li
                  key={car._id}
                  className="w-[300px] h-[300px] p-[15px] bg-white drop-shadow-lg rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
                >
                  <Link href={"cars/" + car._id}>
                    <Image src={carExample} width={270} alt="car image" />
                    <h3 className="text-[20px] font-semibold mt-[10px]">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-[16px] my-[3px]">${car.price} CAD</p>
                    <ul className="flex divide-x-[1px] text-[14px] ">
                      <li className="pr-[10px]">{car.mileage}km</li>
                      <li className="px-[10px]">{car.location}</li>
                      <li className="pl-[10px]">{car.transmission}</li>
                    </ul>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {isLoading && <Loading />}
        </div>
      </div>
      <div id="test" className="mt-[50px] h-[100px]">
        {" "}
      </div>
    </>
  );
}
