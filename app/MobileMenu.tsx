"use client";

import { menu } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const MobileMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event: { target: any }) => {
      if (!ref.current?.contains(event.target)) {
        setIsOpened(false);
      }
    };

    window.addEventListener("touchstart", handleOutSideClick);

    return () => {
      window.removeEventListener("touchstart", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <div
        onClick={() => setIsOpened((prevState) => !prevState)}
        className={
          (isOpened ? "hover:scale-75 transition " : "") +
          "absolute left-[15px] top-[15px] xl:hidden"
        }
      >
        <Image src={menu} alt="" width="40" height="40" />
      </div>
      <ul
        className={
          (isOpened ? "" : "opacity-0 hidden ") +
          "transition opacity-1 absolute bg-secondary text-white w-[100%] grid md:grid-cols-2 md:bg-opacity-90 text-center gap-[20px] md:gap-[40px] py-[40px] md:py-[58px] z-20 drop-shadow"
        }
      >
        <li>
          <Link href="/cars" onClick={() => setIsOpened(false)}>
            <p className="text-xl md:text-2xl">search</p>
            <p className="text-2xl md:text-4xl leading-7">Cars</p>
          </Link>
        </li>
        <li>
          <Link href="/wheels" onClick={() => setIsOpened(false)}>
            <p className="text-xl md:text-2xl">search</p>
            <p className="text-2xl md:text-4xl leading-7">Wheels</p>
          </Link>
        </li>
        <li>
          <Link href="/accessories" onClick={() => setIsOpened(false)}>
            <p className="text-xl md:text-2xl">search</p>
            <p className="text-2xl md:text-4xl leading-7">Accessories</p>
          </Link>
        </li>
        <li>
          <Link
            href="https://www.instagram.com/blessedminion/"
            onClick={() => setIsOpened(false)}
          >
            <p className="text-xl md:text-2xl">search</p>
            <p className="text-2xl md:text-4xl leading-7">Interesting</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
