export const Hero = () => {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        id="bg-video"
        className="h-[500px] w-[100vw] object-cover brightness-50 relative"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute text-white text-center inset-0 top-[278px]">
        <h1 className="font-ammonite text-9xl ">jdm garage</h1>
        <p className="text-4xl mt-[25px]">
          Unleash Your JDM Experience with
          <br /> Authentic Cars and High-Quality Wheels.
        </p>
      </div>
    </div>
  );
};
