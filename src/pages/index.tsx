import { useState, FormEvent, useEffect, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Loader from "@/components/Loader";
import Card from "@/components/Card";

const Main = () => {
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<{ url: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (inputRef.current) {
      if (window.scrollY >= 100) {
        inputRef.current.classList.add(
          "fixed",
          "top-[3rem]",
          "left-0",
          "px-[1rem]",
          "md:px-[3rem]",
          "z-[99]"
        );
      } else {
        inputRef.current.classList.remove(
          "fixed",
          "top-[3rem]",
          "left-0",
          "px-[1rem]",
          "md:px-[3rem]"
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const imagesFromStorage =
      JSON.parse(localStorage.getItem("data") as string) || [];
    setItems(imagesFromStorage);
  }, []);

  const handleQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { images: data },
      } = await axios.post("/api/images", { prompt });

      let imagesFromStorage =
        JSON.parse(localStorage.getItem("data") as string) || [];

      imagesFromStorage = [...data, ...imagesFromStorage];

      localStorage.setItem("data", JSON.stringify(imagesFromStorage));
      setItems([...data, ...items]);
      setPrompt("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-neutral-100  px-[1rem] md:px-[3rem] justify-center min-h-screen">
      <Head>
        <title>DALL-E Image Generator</title>
      </Head>
      <div className="min-h-[40vh] flex flex-col justify-center">
        <div className="flex text-slate-800 gap-3 items-center my-4 ">
          <h1>Start with a detailed description</h1>
          {/* <button className="bg-slate-300 p-2 rounded text-xs">
            Surprise me
          </button> */}
        </div>
        <form onSubmit={handleQuery}>
          <div
            ref={inputRef}
            className="flex w-full flex-col md:flex-row gap-3 md:gap-0 justify-center"
          >
            <textarea
              value={prompt}
              className="flex-1 shadow-lg p-2  md:rounded-l z-50"
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              placeholder="A cow crossing the road at times square"
            />
            <button
              disabled={loading}
              className="shadow-lg bg-white p-2  md:rounded-r text-gray-600 font-bold flex gap-2 items-center hover:bg-neutral-800 hover:text-white"
            >
              {loading ? <Loader /> : "Generate"}
            </button>
          </div>

          {/* <p className="text-neutral-500 text-center my-[2rem]">
            Or, <span className="text-neutral-800">upload an image</span> to
            edit
          </p> */}
        </form>
      </div>

      <div className="grid grid-cols-2 my-3 lg:grid-cols-3 gap-1">
        <>
          {items?.map((item) => (
            <Card item={item} key={item.url} />
          ))}
        </>
      </div>
    </div>
  );
};
export default Main;
