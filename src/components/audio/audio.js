// app/page.js or pages/index.js
"use client"; // for Next.js 13 app dir

import { useState } from 'react';
import WaveformPlayer from './waveform';

export default function audioSec() {
  const [region, setRegion] = useState({ start: 0, end: 0 });

  const handleRegionChange = (data) => {
    console.log('Selected region:', data);
    setRegion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">WaveSurfer in Next.js</h1>
      <WaveformPlayer
        audioUrl="/audio.mp3" // Place the file in /public folder
        onRegionChange={handleRegionChange}
      />
      <p className="mt-4">Start: {region.start.toFixed(2)} sec</p>
      <p>End: {region.end.toFixed(2)} sec</p>
    </div>
  );
}
