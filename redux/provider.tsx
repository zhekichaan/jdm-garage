"use client";

import DropdownMenu from "@/app/DropdownMenu";
import { Header } from "@/app/Header";
import MobileMenu from "@/app/MobileMenu";
import { store } from "./store";
import { Provider } from "react-redux";
import { Cart } from "@/app/Cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Cart />
      <Header />
      <DropdownMenu />
      <MobileMenu />
      {children}
      {/* <Footer /> */}
    </Provider>
  );
}
