"use client"
import { useEffect, useState, useRef } from "react";
import NavBar from "@/components/navBar";
import dynamic from 'next/dynamic';

// Lazy load each section
const PDFSec = dynamic(() => import('@/components/pdf/pdf'));
const ImageSec = dynamic(() => import('@/components/image/image'));

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

  const [showComponent, setShowComponent] = useState('');
  const firstLoadRef = useRef(true); // Tracks first load

  useEffect(() => {
    if (active === '') return;

    if (firstLoadRef.current) {
      // First time: debounce
      const timer = setTimeout(() => {
        setShowComponent(active);
        firstLoadRef.current = false; // Mark first load complete
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // All later times: show instantly
      setShowComponent(active);
    }
  }, [active]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Navbar */}
      <div className={`bg-[#121212] flex w-full justify-center items-center transition-all border-b-2 border-amber-900 duration-1000  ${active !== "" ? "h-20" : "h-[50vh]"
        }`}>
        <NavBar active={active} />
      </div>

      <div className={`relative flex flex-1 flex-col w-full items-center  `}>

        {/* Working with tab */}
          <span
            className={`mx-auto my-8 font-bold transition-all duration-1000 ${active !== "" ? "text-base sm:text-lg md:text-xl opacity-0" : "text-4xl sm:text-5xl"
              }`}
          >
            Workin&apos; W:
          </span>

          <div
            className={`absolute flex flex-wrap justify-center border-2 border-amber-900 rounded-full transition-transform duration-1000 ${active !== "" ? "scale-90 translate-y-4" : "scale-100 translate-y-32"
              }`}
          >
            {buttons.map((btn) => (
              <div
                key={btn.title}
                className={`py-2 px-5 sm:px-6 md:px-16 m-2 text-sm sm:text-base md:text-lg lg:text-xl rounded-full cursor-pointer border-2 border-transparent transition-all duration-300 text-gray-400 hover:border-amber-800 hover:text-white ${active === btn.title && "bg-amber-900 text-white"
                  }`}
                onClick={() => { setActive(btn.title) }}
              >
                {btn.title}
              </div>
            ))}
          </div>
      

        {/* Conditional rendering after debounce */}
        <div className="mt-8">
          {showComponent === 'PDF' && <PDFSec />}
          {showComponent === 'Image' && <ImageSec />}
        </div>
      </div>

    </div>
  );
}
