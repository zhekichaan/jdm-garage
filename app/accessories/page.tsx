"use client";

import { accessoriesBanner, accessoriesExample, filterIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface Accessory {
  _id: string;
  brand: string;
  name: string;
  price: number;
  category: string;
}

export default function Wheels() {
  const [category, setCategory] = useState("");
  const [accessoriesList, setAccessoriesList] = useState<Accessory[]>([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!lastPage) {
          setIsLoading(true);
          if (category !== "") {
            const response = await fetch(
              `https://plum-fragile-kingfisher.cyclic.app/api/accessories/category/?category=${category}&page=${page}`
            );
            const data = await response.json();
            setAccessoriesList((prevList) => [...prevList, ...data]);
            setIsLoading(false);
            if ((await data).length < 12) {
              setLastPage(true);
            } else {
              setLastPage(false);
            }
          } else {
            setIsLoading(true);
            const response = await fetch(
              `https://plum-fragile-kingfisher.cyclic.app/api/accessories?page=${page}`
            );
            const data = await response.json();
            setAccessoriesList((prevList) => [...prevList, ...data]);
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
  }, [category, lastPage, page]);

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

  const handleCategoryChoice = async (category: string) => {
    setIsVisible(false);
    document.body.classList.remove(`overflow-hidden`);
    setLastPage(false);
    setCategory(category);
    setAccessoriesList([]);
    setPage(1);
  };

  return (
    <>
      <div className="w-screen h-[100px] max-w-[1920px] md:h-[200px] relative mx-auto">
        <Image
          src={accessoriesBanner}
          alt="accessories banner"
          className="object-cover h-[100px] md:h-[200px] w-screen brightness-50"
        />
        <h2 className="absolute text-white text-3xl md:text-6xl top-[50%] -translate-y-2/4 left-[10%] xl:right-[20%]">
          Accessories
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
            <p>{category !== "" ? category : "Filters"}</p>
          </button>
          {category !== "" && (
            <button
              className=" flex items-center right-[10%] top-[15px] text-black rounded-full px-4 py-2"
              onClick={() => handleCategoryChoice("")}
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
          <h3 className="text-[32px] pb-[5px]">Category</h3>
          <ul className="text-[36px] xl:text-[20px] flex flex-col gap-[10px] pt-[10px]">
            <li
              onClick={() => handleCategoryChoice("Backpacks")}
              className={
                category === "Backpacks"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Backpacks
            </li>
            <li
              onClick={() => handleCategoryChoice("Hats")}
              className={
                category === "Hats"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Hats
            </li>
            <li
              onClick={() => handleCategoryChoice("Gloves")}
              className={
                category === "Gloves"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Gloves
            </li>
            <li
              onClick={() => handleCategoryChoice("Hoodies")}
              className={
                category === "Hoodies"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Hoodies
            </li>
            <li
              onClick={() => handleCategoryChoice("Wheels")}
              className={
                category === "Wheels"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Wheels
            </li>
            <li
              onClick={() => handleCategoryChoice("Stickers")}
              className={
                category === "Stickers"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Stickers
            </li>
            <li
              onClick={() => handleCategoryChoice("Shifters")}
              className={
                category === "Shifters"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Shifters
            </li>
            <li
              onClick={() => handleCategoryChoice("Seats")}
              className={
                category === "Seats"
                  ? "text-accent cursor-default"
                  : "cursor-pointer hover:scale-105"
              }
            >
              Seats
            </li>
          </ul>
        </div>
        <div className="xl:w-[860px]">
          <ul className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:w-[460px] md:mx-auto xl:mx-0 xl:w-[720px] xl:grid-cols-4 gap-[20px]">
            {accessoriesList.map((accessory: Accessory) => (
              <li
                key={accessory._id}
                className="pb-[10px] bg-white drop-shadow-lg rounded hover:drop-shadow-none hover:outline-[1px] hover:outline-dashed ease-in-out transition-all"
              >
                <Link
                  href={"accessories/" + accessory._id}
                  className="text-center"
                >
                  <Image src={accessoriesExample} alt="wheel example" />
                  <p className="text-[16px] font-medium mt-[5px]">
                    {accessory.brand} {accessory.name}
                  </p>
                  <p className="text-[14px]">from ${accessory.price} CAD</p>
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
