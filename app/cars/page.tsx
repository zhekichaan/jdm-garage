"use client";

import { carsBanner, carExample, filterIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { Island_Moments } from "next/font/google";

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

export default function Cars() {
  let make = "";

  if (typeof window !== "undefined") {
    make = localStorage?.getItem("make") || "";
  }

  const [carMake, setCarMake] = useState(make);
  const [selectedMake, setSelectedMake] = useState("");
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedMake(localStorage?.getItem("make") || "");
    }
    const fetchData = async () => {
      try {
        if (!lastPage) {
          setIsLoading(true);
          if (carMake !== "") {
            const response = await fetch(
              `https://plum-fragile-kingfisher.cyclic.app/api/cars/make/?make=${carMake}&page=${page}`,
              { cache: "no-store" }
            );
            const data: Car[] = await response.json();
            setCarsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if (data.length < 6) {
              setLastPage(true);
            } else {
              setLastPage(false);
            }
          } else {
            const response = await fetch(
              `https://plum-fragile-kingfisher.cyclic.app/api/cars?page=${page}`,
              { cache: "no-store" }
            );
            const data: Car[] = await response.json();
            setCarsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if (data.length < 6) {
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
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    });
    if (carsList.length > 1) {
      const testDiv = document.getElementById("test");
      if (testDiv) {
        observer.observe(testDiv);
      }
    }

    return () => {
      if (carsList.length > 1) {
        const testDiv = document.getElementById("test");
        if (testDiv) {
          observer.unobserve(testDiv);
        }
      }
    };
  }, [carsList.length]);

  const handleFilterOpen = () => {
    setIsVisible((prevState) => !prevState);
    if (!isVisible) {
      document.body.classList.add(`overflow-hidden`);
    } else {
      document.body.classList.remove(`overflow-hidden`);
    }
  };

  const handleMakeChoice = async (carMake: string) => {
    setPage(1);
    setIsVisible(false);
    document.body.classList.remove(`overflow-hidden`);
    setLastPage(false);
    setCarMake(carMake);
    setCarsList([]);
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
      <div className="flex flex-col xl:flex-row relative xl:w-desktop md:px-[25px]  xl:pt-[100px] mx-auto xl:justify-between justify-center">
        <div className="flex xl:absolute py-[25px] left-[100px] top-[80px] justify-center">
          <button
            className=" flex xl:hidden items-center bg-accent top-[15px] text-white rounded-full px-4 py-2"
            onClick={() => handleFilterOpen()}
          >
            <Image
              src={filterIcon}
              alt="filter"
              className="w-[20px] mr-[10px]"
            />
            <p>{carMake !== "" ? carMake : "Filters"}</p>
          </button>
          {carMake !== "" && (
            <button
              className=" flex items-center right-[10%] top-[15px] text-black rounded-full px-4 py-2"
              onClick={() => handleMakeChoice("")}
            >
              <Image
                src={filterIcon}
                alt="filter"
                className="w-[20px] mr-[10px] opacity-0"
              />
              <p>Clear All</p>
            </button>
          )}
        </div>
        <div
          className={
            isVisible
              ? "absolute left-0 top-[80px] z-10 bg-white w-[100%] text-center pb-[500px]"
              : "" + " hidden xl:block divide-y w-[220px] px-[15px]"
          }
        >
          <h3 className="text-[32px] pb-[5px]">Make</h3>
          <ul className="text-[36px] xl:text-[20px] flex flex-col gap-[10px] pt-[10px]">
            <li
              onClick={() => handleMakeChoice("Toyota")}
              className={
                selectedMake === "Toyota"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Toyota
            </li>
            <li
              onClick={() => handleMakeChoice("Nissan")}
              className={
                selectedMake === "Nissan"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Nissan
            </li>
            <li
              onClick={() => handleMakeChoice("Mazda")}
              className={
                selectedMake === "Mazda"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Mazda
            </li>
            <li
              onClick={() => handleMakeChoice("Subaru")}
              className={
                selectedMake === "Subaru"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Subaru
            </li>
            <li
              onClick={() => handleMakeChoice("Honda")}
              className={
                selectedMake === "Honda"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Honda
            </li>
            <li
              onClick={() => handleMakeChoice("Mitsubishi")}
              className={
                selectedMake === "Mitsubishi"
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
            <ul className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:w-[620px] xl:w-[940px] mx-auto xl:grid-cols-3 gap-[20px]">
              {carsList.map((car: Car) => (
                <li
                  key={car._id}
                  className="w-[300px] p-[15px] bg-white drop-shadow-lg rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
                >
                  <Link href={"cars/" + car._id}>
                    <div className="relative w-[270px] h-[180px]">
                      <Image
                        src={car.photos[0]}
                        fill={true}
                        alt="car image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-[20px] font-semibold mt-[10px] text-ellipsis whitespace-nowrap overflow-hidden">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-[16px] my-[3px]">${car.price} CAD</p>
                    <ul className="flex divide-x-[1px] text-[14px] ">
                      <li className="pr-[10px]">{car.mileage}km</li>
                      <li className="px-[10px]">{car.fuel}</li>
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
      <div id="test" className="mt-[50px] h-[100px] w-[100%]"></div>
    </>
  );
}
