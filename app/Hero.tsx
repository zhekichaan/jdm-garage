export const Hero = () => {
  return (
    <div className="">
      <video
        autoPlay
        muted
        loop
        id="bg-video"
        className="hidden md:block md:h-[300px] xl:h-[500px] w-[100vw] object-cover brightness-50 relative"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="pt-[20px] px-[15px] md:pt-0 md:absolute text-white text-center md:inset-0 md:top-[120px] xl:top-[278px]">
        <h1 className="font-ammonite text-[78px] text-black md:text-white md:text-9xl">
          jdm garage
        </h1>
        <p className="text-2xl xl:text-4xl md:w-[520px] xl:w-[780px] mx-auto text-black md:text-white xl:text-white mt-[15px] md:mt-[15px] xl:mt-[25px]">
          Unleash Your JDM Experience with Authentic Cars and High-Quality
          Wheels.
        </p>
      </div>
    </div>
  );
};
