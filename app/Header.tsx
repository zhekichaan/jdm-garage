import Link from "next/link";

export const Header = () => {
  return (
    <div>
      <div className="border-b">
        <div className="flex px-[90px] items-center w-container h-[70px] m-auto ">
          <Link href="/" className="mx-auto text-5xl">
            <div className="text-3xl">JDM GARAGE</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
