import Image from "next/image";
import { Hero } from "./Hero";
import { Catalogue } from "./Catalogue";

export default function Home() {
  return (
    <main>
      <Hero />
      <Catalogue />
    </main>
  );
}
