import React from "react";

const Card = ({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) => {
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    let front = frontRef.current;
    let back = backRef.current;
    front?.classList.toggle("z-0");
    back?.classList.toggle("hidden");
    back?.classList.toggle("absolute");
    back?.classList.toggle("flex");
  };
  return (
    <div
      className="relative w-full max-h-[450px] text-gray-800"
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <div ref={frontRef} className="w-full h-full ">
        {front}
      </div>
      <div
        ref={backRef}
        className="hidden px-5  z-50 bg-[#f4f4f4f6] w-full h-full flex-col py-[3rem] top-0 justify-between"
      >
        {back}

        {/* <p className="text-gray-500">Click to try</p> */}
      </div>
    </div>
  );
};

export default Card;
