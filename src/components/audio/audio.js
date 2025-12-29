import React from 'react'
import { useEffect, useState } from 'react';
import { Range } from "react-range";

const AudioSec = () => {


  const [range, setRange] = useState([0, 234]);


  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };




  return (
    <div className="flex gap-4 h-[calc(100vh-200px)] overflow-y-auto px-2 scrollbar-none lg:gap-16 xl:gap-24 items-center lg:justify-center flex-col lg:flex-row">

      <div className="w-full max-w-xl">

        {/* Line start / end labels */}
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>00:00</span>
          <span>{formatTime(367)}</span>
        </div>

        <Range
          values={range}
          min={0}
          max={367}
          step={1}
          onChange={setRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="relative h-2 bg-gray-600 w-[500px] rounded"
            >
              {/* Selected area */}
              <div className="absolute h-2 bg-amber-400 rounded"/>
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="relative h-4 w-4 bg-white border-2 border-amber-400 rounded-full"
            >
              {/* Time label */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-1 rounded">
                {formatTime(range[index])}
              </div>
            </div>
          )}
        />
      </div>

    </div>
  )
}

export default AudioSec
