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
    front?.classList.toggle("hidden");
    back?.classList.toggle("hidden");
    back?.classList.add(
      "absolute",
      "bg-white",
      "h-full",
      "w-full",
      "flex",
      "items-center",
      "justify-center"
    );
  };
  return (
    <div
      className="relative w-full max-h-[450px]"
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <div ref={frontRef} className="w-full h-full ">
        {front}
      </div>
      <div ref={backRef} className="hidden px-2">
        {back}
      </div>
    </div>
  );
};

export default Card;
