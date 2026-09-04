// useFaviconAnimation.js
// Drop in src/ — import and call in FontSketchMatcher.jsx

import { useEffect, useRef } from "react";

const FRAME_COUNT = 12;
const FRAME_MS    = 80;

// Preload all frames so swapping is instant
const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const img = new Image();
  img.src = `/favicon-${i}.png`;
  return `/favicon-${i}.png`;
});

function getFaviconLink() {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  return link;
}

export function useFaviconAnimation(active) {
  const iv = useRef(null);
  const frameIdx = useRef(0);

  useEffect(() => {
    const link = getFaviconLink();
    if (active) {
      // start cycling
      if (iv.current) return;
      iv.current = setInterval(() => {
        frameIdx.current = (frameIdx.current + 1) % FRAME_COUNT;
        link.href = frames[frameIdx.current];
      }, FRAME_MS);
    } else {
      // stop, reset to static
      if (iv.current) { clearInterval(iv.current); iv.current = null; }
      link.href = "/favicon.png";
    }
    return () => {
      if (iv.current) { clearInterval(iv.current); iv.current = null; }
    };
  }, [active]);
}
