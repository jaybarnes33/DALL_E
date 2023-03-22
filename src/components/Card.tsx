import React from "react";
import Image from "next/image";
import Link from "next/link";
const Card = ({ item }: { item: { url: string; text: string } }) => {
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(false);
  const handleFlip = () => {
    let back = backRef.current;

    back?.classList.toggle("hidden");
    back?.classList.toggle("absolute");
    back?.classList.toggle("flex");
  };

  return (
    <div className="relative w-full max-h-[450px] text-gray-800">
      <Link href={item.url} download target="_blank" rel="noreferrer noopener">
        <span className="h-10 cursor-pointer w-10 rounded-full flex items-center justify-center bg-white absolute -right-2 -top-5 z-[90]">
          &darr;
        </span>
      </Link>

      <div onMouseEnter={handleFlip} onMouseLeave={handleFlip}>
        <div ref={frontRef} className="w-full h-full ">
          <Image
            loading="lazy"
            src={item.url}
            alt={item.text}
            width={300}
            height={300}
            className="w-full max-h-[450px]"
          />
        </div>
        <div
          ref={backRef}
          className="hidden px-5  z-50 bg-[#f4f4f4f6] w-full h-full flex-col py-[3rem] top-0 justify-between"
        >
          <p>{item.text}</p>

          {/* <p className="text-gray-500">Click to try</p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
