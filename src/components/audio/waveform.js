// components/WaveformPlayer.js
'use client'; // if using Next.js 13+ app directory

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';

export default function WaveformPlayer({ audioUrl, onRegionChange }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Create wavesurfer instance
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ccc',
      progressColor: '#3b82f6', // Tailwind blue-500
      cursorColor: '#111',
      height: 100,
      responsive: true,
      plugins: [
        RegionsPlugin.create({
          regions: [],
          dragSelection: {
            slop: 5,
          },
        }),
      ],
    });

    // Load audio
    wavesurferRef.current.load(audioUrl);

    // Listen to region updates
    wavesurferRef.current.on('region-updated', (region) => {
      if (onRegionChange) {
        onRegionChange({ start: region.start, end: region.end });
      }
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, [audioUrl]);

  return (
    <div>
      <div ref={waveformRef} id="waveform" />
    </div>
  );
}
