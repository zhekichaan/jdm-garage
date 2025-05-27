"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import Image from "next/image";
import { backIcon, cartIcon, minus, plus, wheelExample } from "@/public";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";

interface Product {
  _id: string;
  name: string;
  price: number;
  size: string;
  additional: string;
  photo: string;
  quantity: number;
}

export const Cart = () => {
  const [isOpened, setIsOpened] = useState(false);
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  const handleBackDropClick = (e: { currentTarget: any; target: any }) => {
    if (e.currentTarget === e.target) {
      setIsOpened(false);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return !isOpened ? (
    <div onClick={() => setIsOpened(true)}>
      <Image
        src={cartIcon}
        alt="cart"
        width={40}
        className="absolute top-[15px] right-[30px] md:right-[100px]"
      />
      <span className="absolute h-[20px] p-[3px] min-w-[20px] top-[15px] right-[25px] md:right-[83px] rounded-[12px] bg-black text-white text-center text-xs">
        {cart.length}
      </span>
    </div>
  ) : (
    <div
      className="fixed bg-black/[.20] w-[100%] h-[100vw] z-30"
      onClick={handleBackDropClick}
    >
      <div className="absolute right-0 h-[100vw] p-7 pt-[60px] border-s bg-white w-[450px]">
        <Image
          className="absolute top-[15px]"
          src={backIcon}
          alt="cart"
          width={30}
          onClick={() => setIsOpened(!isOpened)}
        />
        <div className="relative h-[calc(var(--vh,1vh)*100-100px)]">
          {cart.length === 0 ? (
            <h1>Your Cart is Empty!</h1>
          ) : (
            <div className="h-[calc(var(--vh,1vh)*100-100px-200px)]">
              {cart.map((item: Product) => (
                <div
                  key={item._id + item.additional}
                  className="flex justify-between items-center mb-5"
                >
                  <div className="flex items-center">
                    <Image src={item.photo} width={120} height={120} alt={""} />
                    <div className="flex">
                      <div className="ml-3">
                        <p>{item.name}</p>
                        <p>{item.additional}</p>
                        <p>{item.size}</p>
                        <div className="flex mt-3 items-center gap-2">
                          <button
                            className="px-2"
                            onClick={() => dispatch(decrementQuantity(item))}
                          >
                            <Image src={minus} alt="" width={16} />
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            className="px-2"
                            onClick={() => dispatch(incrementQuantity(item))}
                          >
                            <Image src={plus} alt="" width={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      className="mb-11"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      X
                    </button>
                    <p>$ {item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 w-[100%]">
                <h2>Grand Total: $ {getTotalPrice()}</h2>
                <button className="rounded shadow w-[100%] py-[15px] mt-5 text-[36px] text-white bg-accent hover:brightness-95 transition-all">
                  Order Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
