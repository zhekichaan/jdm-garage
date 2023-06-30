"use client";

import { Hero } from "./Hero";
import { NewArrivals } from "./newArrivals";
import { Catalogue } from "./Catalogue";

export default function Home() {
  return (
    <main>
      <Hero />
      <Catalogue />
      <NewArrivals />
    </main>
  );
}
