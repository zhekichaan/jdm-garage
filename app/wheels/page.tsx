"use client";

import { filterIcon, wheelExample, wheelsBanner } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface Wheel {
  _id: string;
  brand: string;
  name: string;
  price: number;
  color: string;
  size: string;
}

export default function Wheels() {
  const value = localStorage?.getItem("brand") || "";

  const [wheelBrand, setWheelBrand] = useState(value);
  const [wheelsList, setWheelsList] = useState<Wheel[]>([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!lastPage) {
          setIsLoading(true);
          if (wheelBrand !== "") {
            const response = await fetch(
              `https://enthusiastic-coat-cow.cyclic.app/api/wheels/brand/?brand=${wheelBrand}&page=${page}`
            );
            const data = await response.json();
            setWheelsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if ((await data).length < 12) {
              setLastPage(true);
            } else {
              setLastPage(false);
            }
          } else {
            setIsLoading(true);
            const response = await fetch(
              `https://enthusiastic-coat-cow.cyclic.app/api/wheels?page=${page}`
            );
            const data = await response.json();
            setWheelsList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if ((await data).length < 12) {
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
  }, [lastPage, page, wheelBrand]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !lastPage && !isLoading) {
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
  }, [isLoading, lastPage]);

  const handleFilterOpen = () => {
    setIsVisible((prevState) => !prevState);
    if (!isVisible) {
      document.body.classList.add(`overflow-hidden`);
    } else {
      document.body.classList.remove(`overflow-hidden`);
    }
  };

  const handleBrandChoice = async (wheelBrand: string) => {
    setIsVisible(false);
    document.body.classList.remove(`overflow-hidden`);
    setLastPage(false);
    setWheelBrand(wheelBrand);
    setWheelsList([]);
    setPage(1);
  };

  return (
    <>
      <div className="w-screen h-[100px] max-w-[1920px] md:h-[200px] relative mx-auto">
        <Image
          src={wheelsBanner}
          alt="cars banner"
          className="object-cover h-[100px] md:h-[200px] w-screen brightness-50"
        />
        <h2 className="absolute text-white text-3xl md:text-6xl top-[50%] -translate-y-2/4 left-[10%] xl:right-[20%]">
          Wheels
        </h2>
      </div>
      <div className="flex relative xl:w-desktop md:px-[25px] pt-[70px] xl:pt-[100px] mx-auto xl:justify-between justify-center">
        <button
          className="flex items-center bg-accent absolute top-[15px] text-white rounded-full px-4 py-2"
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
          <h3 className="text-[32px] pb-[5px]">Brand</h3>
          <ul className="text-[36px] xl:text-[20px] flex flex-col gap-[10px] pt-[10px]">
            <li
              onClick={() => handleBrandChoice("Work")}
              className={
                wheelBrand === "Work"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Work
            </li>
            <li
              onClick={() => handleBrandChoice("Enkei")}
              className={
                wheelBrand === "Enkei"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Enkei
            </li>
            <li
              onClick={() => handleBrandChoice("Rays")}
              className={
                wheelBrand === "Rays"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              RAYS
            </li>
            <li
              onClick={() => handleBrandChoice("Weds")}
              className={
                wheelBrand === "Weds"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Weds
            </li>
            <li
              onClick={() => handleBrandChoice("BBS")}
              className={
                wheelBrand === "BBS"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              BBS
            </li>
            <li
              onClick={() => handleBrandChoice("SSR")}
              className={
                wheelBrand === "SSR"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              SSR
            </li>
            <li
              onClick={() => handleBrandChoice("Yokohama")}
              className={
                wheelBrand === "Yokohama"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Yokohama
            </li>
            <li
              onClick={() => handleBrandChoice("Watanabe")}
              className={
                wheelBrand === "Watanabe"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Watanabe
            </li>
          </ul>
        </div>
        <div className="xl:w-[860px]">
          <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-[20px]">
            {wheelsList.map((wheel: Wheel) => (
              <li
                key={wheel._id}
                className="pb-[10px] bg-white drop-shadow-lg rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
              >
                <Link href={"wheels/" + wheel._id} className="text-center">
                  <Image src={wheelExample} alt="wheel example" />
                  <h3 className="text-[14px] font-light mt-[5px]">
                    {wheel.brand} Wheels
                  </h3>
                  <p className="text-[16px] font-medium">
                    {wheel.brand} {wheel.name}
                  </p>
                  <div className="flex justify-center divide-x-[1px]">
                    <p className="text-[14px] pr-[10px]">${wheel.price} CAD</p>
                    <p className="text-[14px] pl-[10px]">{wheel.size}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {isLoading && <Loading />}
        </div>
      </div>
      <div id="test" className="mt-[50px] h-[100px]">
        {" "}
      </div>
    </>
  );
}
