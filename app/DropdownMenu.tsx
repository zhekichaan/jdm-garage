"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  toyota,
  toyotaLogo,
  nissan,
  nissanLogo,
  mazda,
  mazdaLogo,
  lexus,
  lexusLogo,
  honda,
  hondaLogo,
  mitsubishi,
  mitsubishiLogo,
  bbs,
  enkei,
  rays,
  ssr,
  watanabe,
  weds,
  work,
  yokohama,
} from "@/public";
import { useMediaQuery } from "@mui/material";

const DropdownMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleOptionHover = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(true);
  };

  const handleOptionLeave = () => {
    setSelectedOption("");
    setSelectedMake("");
    setShowDropdown(false);
    localStorage.setItem("make", selectedMake);
    localStorage.setItem("brand", selectedBrand);
  };
  return (
    <>
      <div className="hidden xl:block">
        <div className="dropdown">
          <ul className="flex w-[1000px] m-auto justify-between items-center font-montserrat">
            <li>
              <Link
                onMouseEnter={() => handleOptionHover("cars")}
                onMouseLeave={handleOptionLeave}
                onClick={handleOptionLeave}
                href="/cars"
                className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
              >
                <p className="text-xl">search</p>
                <p className="text-2xl leading-7">Cars</p>
              </Link>
            </li>
            <li>
              <Link
                onMouseEnter={() => handleOptionHover("wheels")}
                onMouseLeave={handleOptionLeave}
                onClick={handleOptionLeave}
                href="/wheels"
                className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
              >
                <p className="text-xl">search</p>
                <p className="text-2xl leading-7">Wheels</p>
              </Link>
            </li>
            <li>
              <Link
                href="/accessories"
                className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
              >
                <p className="text-xl">search</p>
                <p className="text-2xl leading-7">Accessories</p>
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="block w-[250px] h-[70px] pt-[5px] pl-[40px] hover:bg-secondary hover:text-white hover:transition"
              >
                <p className="text-xl">search</p>
                <p className="text-2xl leading-7">Interesting</p>
              </Link>
            </li>
          </ul>
        </div>

        {showDropdown && (
          <div
            onMouseLeave={handleOptionLeave}
            onMouseEnter={() => handleOptionHover(selectedOption)}
            className="dropdown-content w-[1000px] h-[500px] absolute left-0 right-0 mx-auto bg-secondary bg-opacity-80 text-white p-[25px] shadow-lg z-20"
          >
            {selectedOption === "cars" && (
              <div className="grid grid-cols-3 grid-rows-2 gap-x-[100px] justify-items-center items-center gap-y-[50px]">
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Nissan")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={nissan}
                    alt="Nissan"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Nissan" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={nissanLogo}
                    alt="Nissan"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Nissan" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Toyota")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={toyota}
                    alt="Toyota"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Toyota" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={toyotaLogo}
                    alt="Toyota"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Toyota" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Lexus")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={lexus}
                    alt="Lexus"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Lexus" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={lexusLogo}
                    alt="Lexus"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Lexus" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Honda")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={honda}
                    alt="Honda"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Honda" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={hondaLogo}
                    alt="Honda"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Honda" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Mazda")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={mazda}
                    alt="Mazda"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Mazda" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={mazdaLogo}
                    alt="Mazda"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Mazda" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
                <Link
                  href={"/cars"}
                  className="w-[200px] relative group"
                  onMouseEnter={() => setSelectedMake("Mitsubishi")}
                  onMouseLeave={() => setSelectedMake("")}
                >
                  <Image
                    src={mitsubishi}
                    alt="Mitsubishi"
                    width="200"
                    className={`transition-opacity ${
                      selectedMake === "Mitsubishi" ? "opacity-0" : "opacity-1"
                    }`}
                  />
                  <Image
                    src={mitsubishiLogo}
                    alt="Mitsubishi"
                    width="200"
                    className={`absolute transition-opacity top-0 ${
                      selectedMake === "Mitsubishi" ? "opacity-1" : "opacity-0"
                    }`}
                    onClick={handleOptionLeave}
                  />
                </Link>
              </div>
            )}

            {selectedOption === "wheels" && (
              <div className="grid grid-cols-4 grid-rows-2 gap-x-[40px] justify-items-center items-center gap-y-[50px]">
                <Link href={"/wheels"}>
                  <Image
                    src={work}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Work")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={enkei}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Enkei")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={rays}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Rays")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={weds}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Weds")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={bbs}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("BBS")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={ssr}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("SSR")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={yokohama}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Yokohama")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
                <Link href={"/wheels"}>
                  <Image
                    src={watanabe}
                    alt=""
                    width="200"
                    className="ease-in-out duration-300 hover:scale-110"
                    onClick={handleOptionLeave}
                    onMouseEnter={() => setSelectedBrand("Watanabe")}
                    onMouseLeave={() => setSelectedBrand("")}
                  ></Image>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
