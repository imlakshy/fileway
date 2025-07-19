"use client"
import { useEffect, useState } from "react";
import ImageSec from "@/components/image/image";
import NavBar from "@/components/navBar";
import PDFSec from "@/components/pdf/pdf";
import MenuIcon from "@/components/icons/MusicIcon";

export default function Home() {

  const [active, setActive] = useState("");

  const buttons = [
    {
      title: "Audio",
      description: "Convert, trim, merge or compress audio files",
      img: "/audio.png",
    },
    {
      title: "PDF",
      description: "Merge, unlock, compress or dark mode PDF",
      img: "/pdf.png",
    },
    {
      title: "Image",
      description: "Convert, resize, compress or edit images",
      img: "/image.png",
    },
    {
      title: "Video",
      description: "Compress, trim, convert or extract audio",
      img: "/video.png",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className={`bg-[#121212] flex w-full justify-center items-center transition-all border-b-2 border-amber-900 duration-1000  ${active !== "" ? "h-16" : "h-[50vh]"
                }`}>
        <NavBar active={active} />
      </div>

      <div className={`flex flex-1 flex-col`}>

        {/* Working with tab */}
        <div className="flex justify-center items-center flex-col gap-8">
          <span
            className={`mt-8 font-bold transition-all duration-500 ${active !== "" ? "text-base sm:text-lg md:text-xl" : "text-4xl sm:text-5xl"
              }`}
          >
            Workin&apos; W:
          </span>

          <div
            className={`flex flex-wrap justify-center border-2 border-amber-900 rounded-full transition-transform duration-1000 ${active !== "" ? "scale-90" : "scale-100"
              }`}
          >
            {buttons.map((btn) => (
              <div
                key={btn.title}
                className={`py-2 px-5 sm:px-6 md:px-16 m-2 text-sm sm:text-base md:text-lg lg:text-xl rounded-full cursor-pointer border-2 border-transparent transition-all duration-300 text-gray-400 hover:border-amber-800 hover:text-white ${active === btn.title && "bg-amber-900 text-white"
                  }`}
                onClick={() => setActive(btn.title)}
              >
                {btn.title}
              </div>
            ))}
          </div>
        </div>


        {active == "Image" && (
          <ImageSec />
        )}
        {active == "PDF" && (
          <PDFSec />
        )}
      </div>

    </div>
  );
}
