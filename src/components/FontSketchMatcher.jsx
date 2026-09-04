import { useState, useRef, useEffect, useCallback } from "react";

const GOOGLE_FONTS = [
  { name: "ABeeZee", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Abel", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.5, xHeight: 0.8, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Acme", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.62, xHeight: 0.76, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Advent Pro", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.55, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Albert Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Alegreya Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.67, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Alex Brush", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Alfa Slab One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Allura", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Almarai", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Amatic SC", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.45, xHeight: 0.82, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: true, isFormal: false, hasOpenCounter: true} },
  { name: "Amita", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: true, isFormal: false, isCasual: false, isLoose: false} },
  { name: "Anek Latin", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Anonymous Pro", category: "monospace", traits: { hasSerif: true, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Anton", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.48, xHeight: 0.82, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Architects Daughter", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: false, isAngular: true, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Archivo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Archivo Black", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Archivo Narrow", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.5, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Arimo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Arvo", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Asap", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Asap Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.48, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Assistant", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "B612 Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Bangers", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.58, xHeight: 0.78, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Barlow", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.58, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Barlow Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.46, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Barlow Semi Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.52, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Be Vietnam Pro", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Bebas Neue", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.44, xHeight: 0.88, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Birthstone", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isCasual: false, isThin: true} },
  { name: "Bitter", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.7, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Black Han Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Bowlby One SC", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.75, xHeight: 0.82, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Bree Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Bungee", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.82, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Bungee Inline", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.82, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Cabin", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Cairo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.65, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Cantarell", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Caveat", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: true, isAngular: false, isFormal: false, hasOpenCounter: false, strokeUniform: false } },
  { name: "Cedarville Cursive", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false} },
  { name: "Chakra Petch", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.6, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Changa One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.5, xHeight: 0.8, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Chewy", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Chivo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Cinzel", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Clicker Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isCasual: false, isLoose: false} },
  { name: "Coda", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Comfortaa", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Commissioner", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Concert One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Contrail One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.65, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Cookie", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: true, isFormal: false, isCasual: false, isLoose: false} },
  { name: "Cormorant", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.62, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Cormorant Garamond", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.6, xHeight: 0.56, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Courgette", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true, isFormal: false, isCasual: false, isLoose: false} },
  { name: "Courier Prime", category: "monospace", traits: { hasSerif: true, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Crafty Girls", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: true, isAngular: true, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Creepster", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Crimson Pro", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.58, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Crimson Text", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.58, xHeight: 0.57, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Cutive Mono", category: "monospace", traits: { hasSerif: true, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "DM Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "DM Serif Display", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "DM Serif Text", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.66, xHeight: 0.64, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Dancing Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.75, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: false, isLoose: false, isAngular: false, isFormal: true, hasOpenCounter: false, strokeUniform: false } },
  { name: "Domine", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.66, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Dosis", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.65, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "EB Garamond", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Eczar", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.67, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Encode Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Encode Sans Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.46, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Engagement", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Euphoria Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Exo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Exo 2", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Faustina", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.66, xHeight: 0.66, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Figtree", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.61, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fira Code", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fira Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fira Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fira Sans Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.48, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fira Sans Extra Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.42, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fjalla One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.52, xHeight: 0.78, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Fleur De Leah", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Fontdiner Swanky", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Forum", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.64, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Frank Ruhl Libre", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.63, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Fraunces", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Fredoka", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.72, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Fredoka One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.72, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Fugaz One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.75, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Gelasio", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Geologica", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Give You Glory", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false, isRough: true} },
  { name: "Gloria Hallelujah", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: true, isAngular: false, isFormal: false, hasOpenCounter: false, strokeUniform: false } },
  { name: "Gochi Hand", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true, isBubbly: true, isCasual: true, isLoose: false, isAngular: false, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Gotu", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Graduate", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Grand Hotel", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isCasual: false, isLoose: false, isAngular: true} },
  { name: "Gravitas One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.72, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Great Vibes", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.5, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Gruppo", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Hahmlet", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.64, xHeight: 0.64, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Hammersmith One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.65, xHeight: 0.76, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Handlee", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: false, isAngular: true, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Hanken Grotesk", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Heebo", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Herr Von Muellerhoff", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Hind", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Hind Madurai", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Hind Siliguri", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Homemade Apple", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.85, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false, isRough: true} },
  { name: "Hurricane", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "IBM Plex Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "IBM Plex Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "IBM Plex Sans Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.46, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "IBM Plex Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.64, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Imperial Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Inconsolata", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.55, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Indie Flower", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true, isBubbly: false, isCasual: true, isLoose: true, isAngular: false, isFormal: false, hasOpenCounter: false, strokeUniform: true } },
  { name: "Inspiration", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isThin: true} },
  { name: "Instrument Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Instrument Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.66, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Inter", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Inter Tight", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.56, xHeight: 0.73, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Island Moments", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Italianno", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "JetBrains Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.74, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Jim Nightshade", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: false, isCasual: false, isLoose: true, isAngular: true} },
  { name: "Jockey One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.55, xHeight: 0.8, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Josefin Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Josefin Slab", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.62, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Jost", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.61, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Jura", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Just Me Again Down Here", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true, isCasual: true, isLoose: true, isAngular: false, hasOpenCounter: false} },
  { name: "K2D", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Kalam", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true, isBubbly: false, isCasual: true, isLoose: false, isAngular: false, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Kanit", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Karla", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Kaushan Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false, isCasual: false, isLoose: false, isAngular: true, isFormal: false} },
  { name: "Knewave", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Kristi", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: false, isCasual: false, isLoose: true} },
  { name: "Kumbh Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "La Belle Aurore", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Lato", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "League Spartan", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Lemonada", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.7, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Lexend", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.68, xHeight: 0.74, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Libre Baskerville", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Libre Franklin", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Lily Script One", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Lobster", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.88, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Lobster Two", category: "display", traits: { hasSerif: true, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Lora", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Lovers Quarrel", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Luckiest Guy", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.88, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "M PLUS 1p", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "M PLUS Rounded 1c", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "McLaren", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.76, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Manrope", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.61, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Maven Pro", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Mea Culpa", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Megrim", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.65, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Meie Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Merriweather", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.7, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Merriweather Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Michroma", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.62, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Miniver", category: "display", traits: { hasSerif: true, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.68, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Miss Fajardose", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Monsieur La Doulaise", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Monoton", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Montserrat", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.75, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Montserrat Alternates", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.75, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Mr De Haviland", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Mrs Saint Delafield", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Mrs Sheppards", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Mukta", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Mulish", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Niconne", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: true, isCasual: false, isLoose: false, isAngular: false, isFormal: false} },
  { name: "Nixie One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.65, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Norican", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: false, isCasual: false, isLoose: false, isAngular: true} },
  { name: "Noto Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Noto Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.64, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Nova Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Nova Script", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Nova Square", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.75, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Nunito", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.65, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Nunito Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Open Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.74, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Orbitron", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.72, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Oswald", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.45, xHeight: 0.75, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Outfit", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Overpass", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Overpass Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Oxanium", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.62, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Oxygen", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Oxygen Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "PT Mono", category: "monospace", traits: { hasSerif: true, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "PT Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "PT Sans Caption", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "PT Sans Narrow", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.48, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "PT Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.67, xHeight: 0.67, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Pacifico", category: "display", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.9, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true, isBubbly: true, isCasual: false, isLoose: false, isAngular: false, isFormal: false, hasOpenCounter: false, strokeUniform: false } },
  { name: "Parisienne", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Passions Conflict", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.82, xHeight: 0.52, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Patua One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Permanent Marker", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false, isRough: true, hasOpenCounter: false} },
  { name: "Petit Formal Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Pirata One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: true, isBold: false, isElegant: false, isRounded: false } },
  { name: "Pinyon Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Playfair Display", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.62, isCondensed: false, highContrast: true, isBold: false, isElegant: false, isRounded: false } },
  { name: "Plus Jakarta Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Podkova", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Poiret One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.68, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Poppins", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.68, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Press Start 2P", category: "display", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Pridi", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Princess Sofia", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Prompt", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Quicksand", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.68, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Questrial", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.65, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Qwigley", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Quintessential", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Racing Sans One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.55, xHeight: 0.8, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Rajdhani", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.58, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Rakkas", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.72, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Raleway", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.65, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Rammetto One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Ranchers", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Red Hat Display", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.65, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Red Hat Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Red Hat Text", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Reenie Beanie", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false, hasOpenCounter: false} },
  { name: "Ribeye", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Righteous", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.65, xHeight: 0.76, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Roboto", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Roboto Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.46, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Roboto Flex", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Roboto Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Roboto Serif", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.64, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Roboto Slab", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Rochester", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Rock Salt", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.85, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: true, isRough: true} },
  { name: "Rokkitt", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.7, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Rouge Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Rowdies", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Rubik", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Rubik Dirt", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Rubik Mono One", category: "display", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.75, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Ruda", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Russo One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Ruthie", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Rye", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sacramento", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.52, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Saira", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Saira Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.46, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sail", category: "display", traits: { hasSerif: true, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.65, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Satisfy", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: false, isLoose: false, isAngular: false, isFormal: true, hasOpenCounter: false, strokeUniform: false } },
  { name: "Schibsted Grotesk", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Secular One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sen", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.63, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sevillana", category: "display", traits: { hasSerif: true, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.8, xHeight: 0.68, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Share Tech Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Shrikhand", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.72, isCondensed: false, highContrast: true, isBold: true, isElegant: false, isRounded: false } },
  { name: "Sigmar One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Signika", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Silkscreen", category: "display", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.6, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Skranji", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Slabo 27px", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sonsie One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Sora", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Sour Gummy", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Source Code Pro", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Source Sans 3", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Space Grotesk", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.63, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Space Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.7, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Special Elite", category: "display", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Spectral", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.63, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Spline Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Squada One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: true, widthRatio: 0.5, xHeight: 0.82, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Staatliches", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.4, xHeight: 0.88, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Style Script", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Sue Ellen Francisco", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isCasual: true, isLoose: true, isAngular: false} },
  { name: "Tangerine", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.52, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isAngular: false, isThin: true} },
  { name: "Teko", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.46, xHeight: 0.82, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Tenor Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.62, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "The Girl Next Door", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: false, isAngular: true, isFormal: false, hasOpenCounter: true, strokeUniform: true } },
  { name: "Tillana", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Titan One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
  { name: "Titillium Web", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.58, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Trade Winds", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Ubuntu", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Ubuntu Condensed", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.48, xHeight: 0.73, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Ubuntu Mono", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.73, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Unica One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.58, xHeight: 0.78, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "UnifrakturMaguntia", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.68, isCondensed: false, highContrast: true, isBold: false, isElegant: true, isRounded: false } },
  { name: "Unna", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.64, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Updock", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "VT323", category: "monospace", traits: { hasSerif: false, isScript: false, isMono: true, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.6, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Varela Round", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: true, widthRatio: 0.65, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Vast Shadow", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Vibur", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.75, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: true, isCasual: false, isLoose: false, isAngular: false, isFormal: false} },
  { name: "Vidaloka", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.62, isCondensed: false, highContrast: true, isBold: false, isElegant: true, isRounded: false } },
  { name: "Viga", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.65, xHeight: 0.8, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Vollkorn", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.66, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Voltaire", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.62, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Walter Turncoat", category: "handwriting", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.72, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false, isBubbly: false, isCasual: true, isLoose: true, isAngular: false, isFormal: false, hasOpenCounter: false, strokeUniform: false } },
  { name: "Waterfall", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.8, xHeight: 0.55, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isLoose: false, isCasual: false, isThin: true} },
  { name: "Wire One", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.55, xHeight: 0.75, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Work Sans", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.63, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Xanh Mono", category: "monospace", traits: { hasSerif: true, isScript: false, isMono: true, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.62, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Yanone Kaffeesatz", category: "display", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.52, xHeight: 0.72, isCondensed: true, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Yantramanav", category: "sans-serif", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.6, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Yeseva One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.65, isCondensed: false, highContrast: true, isBold: false, isElegant: false, isRounded: false } },
  { name: "Yesteryear", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: true, isFormal: false, isCasual: true, isLoose: false} },
  { name: "Yellowtail", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.62, isCondensed: false, highContrast: false, isBold: true, isElegant: true, isRounded: true, isFormal: false, isCasual: false, isLoose: false} },
  { name: "Yatra One", category: "display", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Zeyada", category: "handwriting", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.78, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false, isFormal: true, isThin: true} },
  { name: "Zilla Slab", category: "serif", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: true, isDisplay: false, isGeometric: false, widthRatio: 0.68, xHeight: 0.7, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
];

const DAFONT_FONTS = [
  { name: "Impact Label", category: "display", url: "https://www.dafont.com/impact-label.font", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.5, xHeight: 0.82, isCondensed: true, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Freshman", category: "display", url: "https://www.dafont.com/freshman.font", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.78, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Bleeding Cowboys", category: "display", url: "https://www.dafont.com/bleeding-cowboys.font", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.68, isCondensed: false, highContrast: true, isBold: false, isElegant: false, isRounded: false } },
  { name: "Honey Script", category: "handwriting", url: "https://www.dafont.com/honey-script.font", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.82, xHeight: 0.58, isCondensed: false, highContrast: false, isBold: false, isElegant: true, isRounded: false } },
  { name: "Respective", category: "serif", url: "https://www.dafont.com/respective.font", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.68, xHeight: 0.6, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "KG What the Teacher Wants", category: "handwriting", url: "https://www.dafont.com/kg-what-the-teacher-wants.font", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: false, isGeometric: false, widthRatio: 0.65, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Komika Axis", category: "comic", url: "https://www.dafont.com/komika-axis.font", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.7, xHeight: 0.75, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: true } },
  { name: "Shlop", category: "horror", url: "https://www.dafont.com/shlop.font", traits: { hasSerif: false, isScript: true, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.85, xHeight: 0.68, isCondensed: false, highContrast: false, isBold: false, isElegant: false, isRounded: false } },
  { name: "Adventure", category: "display", url: "https://www.dafont.com/adventure.font", traits: { hasSerif: true, isScript: false, isMono: false, isSlab: false, isDisplay: true, isGeometric: false, widthRatio: 0.72, xHeight: 0.72, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: false } },
  { name: "Pokemon Solid", category: "display", url: "https://www.dafont.com/pokemon.font", traits: { hasSerif: false, isScript: false, isMono: false, isSlab: true, isDisplay: true, isGeometric: false, widthRatio: 0.78, xHeight: 0.80, isCondensed: false, highContrast: false, isBold: true, isElegant: false, isRounded: true } },
];

// ─── GLYPH COMPARISON ENGINE ────────────────────────────────────────────────

// Fonts we actually render glyphs for — curated list covering all style categories
const RENDER_CANDIDATES = [
  // Handwriting — casual print
  "Architects Daughter","Crafty Girls","The Girl Next Door","Handlee","Indie Flower",
  "Kalam","Caveat","Gloria Hallelujah","Walter Turncoat","Amatic SC","Give You Glory",
  "Reenie Beanie","Sue Ellen Francisco","Just Me Again Down Here","Cedarville Cursive",
  // Handwriting — rough/marker
  "Rock Salt","Permanent Marker","Homemade Apple",
  // Handwriting — bubbly/rounded
  "Gochi Hand","Fredoka One","Chewy","Nunito",
  // Script — formal
  "Dancing Script","Great Vibes","Sacramento","Pacifico","Satisfy","Lobster",
  "Allura","Alex Brush","Tangerine","Kaushan Script","Courgette","Cookie",
  "Grand Hotel","Norican","Clicker Script",
  // Sans-serif
  "Roboto","Open Sans","Lato","Montserrat","Poppins","Inter","Raleway","Oswald",
  "Bebas Neue","Anton","Barlow","Barlow Condensed","Nunito Sans","Work Sans",
  "DM Sans","Figtree","Outfit","Plus Jakarta Sans","Jost","Manrope",
  // Serif
  "Playfair Display","Merriweather","Lora","EB Garamond","Cormorant Garamond",
  "Libre Baskerville","PT Serif","Noto Serif","Crimson Text","Fraunces",
  // Slab
  "Roboto Slab","Zilla Slab","Bitter","Arvo","Rokkitt",
  // Display
  "Abril Fatface","Bangers","Bungee","League Spartan","Russo One",
  "Staatliches","Teko","Fjalla One","Righteous","Orbitron",
  // Mono
  "Source Code Pro","JetBrains Mono","Fira Code","Space Mono","Roboto Mono",
];

const OFFSCREEN_SIZE = 160;
const COMPARE_SIZE   = 64;

function loadFont(fontName) {
  return new Promise((resolve) => {
    const encoded = fontName.replace(/ /g, "+");
    if (!document.querySelector(`link[data-font="${fontName}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;700&display=swap`;
      link.setAttribute("data-font", fontName);
      document.head.appendChild(link);
    }
    const timeout = setTimeout(resolve, 4000);
    Promise.all([
      document.fonts.load(`400 40px '${fontName}'`),
      document.fonts.load(`700 40px '${fontName}'`),
    ]).then(() => { clearTimeout(timeout); resolve(); }).catch(() => { clearTimeout(timeout); resolve(); });
  });
}

function renderGlyph(char, fontFamily, weight, size) {
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.font = `${weight} ${size * 0.6}px ${fontFamily}`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2);
  return ctx.getImageData(0, 0, size, size);
}

// Crop to bbox, resample to COMPARE_SIZE grid (area-averaged), preserve aspect by
// fitting into square with padding so proportions carry signal.
function toGrid(imageData) {
  const { data, width, height } = imageData;
  let minX = width, maxX = -1, minY = height, maxY = -1;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * 4 + 3] > 20) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) return null;
  const bW = maxX - minX + 1, bH = maxY - minY + 1;
  const side = Math.max(bW, bH);
  const offX = minX - Math.floor((side - bW) / 2);
  const offY = minY - Math.floor((side - bH) / 2);
  const cs = COMPARE_SIZE;
  const out = new Float32Array(cs * cs);
  const step = side / cs;
  for (let oy = 0; oy < cs; oy++) for (let ox = 0; ox < cs; ox++) {
    const x0 = offX + ox * step, y0 = offY + oy * step;
    const x1 = x0 + step, y1 = y0 + step;
    let sum = 0, n = 0;
    for (let y = Math.floor(y0); y < Math.ceil(y1); y++) for (let x = Math.floor(x0); x < Math.ceil(x1); x++) {
      n++;
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      sum += data[(y * width + x) * 4 + 3] / 255;
    }
    out[oy * cs + ox] = n ? sum / n : 0;
  }
  return out;
}

function binarize(grid, t) {
  const out = new Uint8Array(grid.length);
  for (let i = 0; i < grid.length; i++) out[i] = grid[i] > t ? 1 : 0;
  return out;
}

// Outline = ink pixels with at least one non-ink 4-neighbor. Turns a filled glyph into a line drawing.
function outline(bin) {
  const cs = COMPARE_SIZE, out = new Uint8Array(bin.length);
  for (let y = 0; y < cs; y++) for (let x = 0; x < cs; x++) {
    const i = y * cs + x;
    if (!bin[i]) continue;
    const n = y > 0 ? bin[i - cs] : 0, s = y < cs - 1 ? bin[i + cs] : 0;
    const w = x > 0 ? bin[i - 1] : 0,  e = x < cs - 1 ? bin[i + 1] : 0;
    if (!n || !s || !w || !e) out[i] = 1;
  }
  return out;
}

// Distance transform: for every cell, distance (in steps, 8-connected) to nearest set cell.
function distanceTransform(bin) {
  const cs = COMPARE_SIZE, n = bin.length;
  const dist = new Float32Array(n).fill(1e9);
  const q = new Int32Array(n); let head = 0, tail = 0;
  for (let i = 0; i < n; i++) if (bin[i]) { dist[i] = 0; q[tail++] = i; }
  while (head < tail) {
    const i = q[head++], x = i % cs, y = (i - x) / cs, d = dist[i] + 1;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= cs || yy >= cs) continue;
      const j = yy * cs + xx;
      if (dist[j] > d) { dist[j] = d; q[tail++] = j; }
    }
  }
  return dist;
}

// Symmetric chamfer distance between two line drawings. Lower = more similar.
function chamfer(a, b) {
  const da = distanceTransform(a), db = distanceTransform(b);
  let sa = 0, na = 0, sb = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    if (b[i]) { sa += da[i]; na++; }
    if (a[i]) { sb += db[i]; nb++; }
  }
  if (!na || !nb) return 1e9;
  return (sa / na + sb / nb) / 2;
}

// Sketch → line drawing (outline handles thick brush widths too)
function prep(grid) {
  const bin = binarize(grid, 0.25);
  return { lines: outline(bin), dt: distanceTransform(outline(bin)) };
}

function similarity(sketchPrepped, glyphGrid) {
  const gl = outline(binarize(glyphGrid, 0.5));
  const d = chamfer(sketchPrepped.lines, gl);
  // Map distance to 0..1. A perfect trace is ~0-1px off; 6px+ is a different letter.
  return Math.max(0, Math.min(1, 1 - d / 7));
}

async function detectLetter(sketchCanvas, isUpper) {
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  // Use multiple reference fonts for better coverage
  const refFonts = [
    "'Roboto', sans-serif",
    "'Georgia', serif",
    "'Arial', sans-serif",
  ];
  const sketchGrid = toGrid(sketchCanvas.getContext("2d").getImageData(0, 0, sketchCanvas.width, sketchCanvas.height));
  if (!sketchGrid) return [];
  const sketchPrepped = prep(sketchGrid);
  const scores = {};
  for (const letter of allLetters) {
    const char = isUpper ? letter : letter.toLowerCase();
    let best = 0;
    for (const refFont of refFonts) {
      for (const weight of [400, 700]) {
        const grid = toGrid(renderGlyph(char, refFont, weight, OFFSCREEN_SIZE));
        if (!grid) continue;
        const s = similarity(sketchPrepped, grid);
        if (s > best) best = s;
      }
    }
    scores[letter] = best;
  }
  return Object.entries(scores)
    .map(([letter, score]) => ({ letter, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

async function compareSketchToFonts(sketchCanvas, char, onProgress) {
  const sketchGrid = toGrid(sketchCanvas.getContext("2d").getImageData(0, 0, sketchCanvas.width, sketchCanvas.height));
  if (!sketchGrid) return [];
  const sketchPrepped = prep(sketchGrid);

  // Fallback fingerprints: what a NOT-loaded font renders as. Any glyph matching these is skipped.
  const fallbacks = ["serif", "sans-serif", "monospace"].flatMap(ff => [400, 700].map(w => toGrid(renderGlyph(char, ff, w, OFFSCREEN_SIZE))));
  const isFallback = (grid) => fallbacks.some(f => f && chamfer(outline(binarize(grid,0.5)), outline(binarize(f,0.5))) < 0.15);

  const results = [];
  const total = RENDER_CANDIDATES.length;
  for (let i = 0; i < total; i++) {
    const fontName = RENDER_CANDIDATES[i];
    onProgress && onProgress(i / total, fontName);
    await loadFont(fontName);
    for (const weight of [400, 700]) {
      const grid = toGrid(renderGlyph(char, `'${fontName}'`, weight, OFFSCREEN_SIZE));
      if (!grid || isFallback(grid)) continue;
      results.push({ fontName, weight, similarity: similarity(sketchPrepped, grid) });
    }
  }

  const best = {};
  for (const r of results) if (!best[r.fontName] || r.similarity > best[r.fontName].similarity) best[r.fontName] = r;
  return Object.values(best).sort((a, b) => b.similarity - a.similarity);
}

// ─── IMAGE IMPORT ────────────────────────────────────────────────────────────
// Loads an image (paste/upload), isolates the largest single glyph, and paints it
// as ink onto the sketch canvas so the normal matching flow can run on it.
function loadImageElement(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}

function imageToInk(img, maxDim = 400) {
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale)), h = Math.max(1, Math.round(img.height * scale));
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const lum = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) lum[i] = (0.299 * d[i*4] + 0.587 * d[i*4+1] + 0.114 * d[i*4+2]) / 255;
  // Background = median of border pixels
  const border = [];
  for (let x = 0; x < w; x++) { border.push(lum[x], lum[(h-1)*w + x]); }
  for (let y = 0; y < h; y++) { border.push(lum[y*w], lum[y*w + w-1]); }
  border.sort((a,b)=>a-b);
  const bg = border[Math.floor(border.length/2)];
  const darkBg = bg < 0.5;
  const ink = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) ink[i] = (darkBg ? lum[i] - bg : bg - lum[i]) > 0.3 ? 1 : 0;

  // Largest connected component (8-connected)
  const label = new Int32Array(w * h).fill(-1);
  let best = null, bestSize = 0;
  const stack = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (!ink[i] || label[i] !== -1) continue;
    let sp = 0, size = 0; stack[sp++] = i; label[i] = i;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    while (sp) {
      const j = stack[--sp]; size++;
      const x = j % w, y = (j - x) / w;
      if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const k = yy * w + xx;
        if (ink[k] && label[k] === -1) { label[k] = i; stack[sp++] = k; }
      }
    }
    if (size > bestSize) { bestSize = size; best = { id: i, minX, maxX, minY, maxY }; }
  }
  if (!best) return null;
  return { ink, label, w, h, ...best };
}

function paintInkToCanvas(res, canvas, pad = 24) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bW = res.maxX - res.minX + 1, bH = res.maxY - res.minY + 1;
  const avail = canvas.width - pad * 2;
  const s = avail / Math.max(bW, bH);
  const outW = Math.round(bW * s), outH = Math.round(bH * s);
  const ox = Math.round((canvas.width - outW) / 2), oy = Math.round((canvas.height - outH) / 2);
  const out = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < outH; y++) for (let x = 0; x < outW; x++) {
    const sx = res.minX + Math.min(bW - 1, Math.floor(x / s));
    const sy = res.minY + Math.min(bH - 1, Math.floor(y / s));
    const k = sy * res.w + sx;
    if (res.ink[k] && res.label[k] === res.id) {
      const o = ((oy + y) * canvas.width + (ox + x)) * 4;
      out.data[o] = 26; out.data[o+1] = 26; out.data[o+2] = 26; out.data[o+3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
}

// ─── IMAGE FONT TOOL ENGINE ─────────────────────────────────────────────────
function imageToComponents(img, maxDim = 600) {
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale)), h = Math.max(1, Math.round(img.height * scale));
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const lum = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) lum[i] = (0.299*d[i*4] + 0.587*d[i*4+1] + 0.114*d[i*4+2]) / 255;
  const border = [];
  for (let x = 0; x < w; x++) border.push(lum[x], lum[(h-1)*w+x]);
  for (let y = 0; y < h; y++) border.push(lum[y*w], lum[y*w+w-1]);
  border.sort((a,b)=>a-b);
  const bg = border[Math.floor(border.length/2)];
  const darkBg = bg < 0.5;
  const ink = new Uint8Array(w*h);
  for (let i = 0; i < w*h; i++) ink[i] = (darkBg ? lum[i]-bg : bg-lum[i]) > 0.3 ? 1 : 0;
  const label = new Int32Array(w*h).fill(-1);
  const comps = [];
  const stack = new Int32Array(w*h);
  for (let i = 0; i < w*h; i++) {
    if (!ink[i] || label[i] !== -1) continue;
    let sp = 0, size = 0; stack[sp++] = i; label[i] = comps.length;
    let minX = w, maxX = 0, minY = h, maxY = 0;
    while (sp) {
      const j = stack[--sp]; size++;
      const x = j % w, y = (j-x)/w;
      if (x<minX)minX=x; if (x>maxX)maxX=x; if (y<minY)minY=y; if (y>maxY)maxY=y;
      for (let dy=-1;dy<=1;dy++) for (let dx=-1;dx<=1;dx++) {
        const xx=x+dx, yy=y+dy;
        if (xx<0||yy<0||xx>=w||yy>=h) continue;
        const k = yy*w+xx;
        if (ink[k] && label[k]===-1) { label[k]=comps.length; stack[sp++]=k; }
      }
    }
    comps.push({ id: comps.length, size, minX, maxX, minY, maxY, wpx: maxX-minX+1, hpx: maxY-minY+1 });
  }
  return { ink, label, w, h, comps };
}

// Pick glyph-sized components, left-to-right, drop specks/punctuation.
function pickGlyphs(res, max = 8) {
  if (!res.comps.length) return [];
  const heights = res.comps.map(c => c.hpx).sort((a,b)=>a-b);
  const medH = heights[Math.floor(heights.length*0.75)];
  const good = res.comps.filter(c => c.hpx >= medH*0.55 && c.size >= 12);
  // Keep the top text line: cluster by vertical center
  const cy = good.map(c => (c.minY+c.maxY)/2);
  const topY = Math.min(...cy);
  const line = good.filter((c,i) => Math.abs(cy[i]-topY) < medH*0.8);
  return line.sort((a,b)=>a.minX-b.minX).slice(0, max);
}

function componentToImageData(res, comp) {
  const bW = comp.wpx, bH = comp.hpx;
  const cv = document.createElement("canvas"); cv.width = bW; cv.height = bH;
  const ctx = cv.getContext("2d");
  const out = ctx.createImageData(bW, bH);
  for (let y = 0; y < bH; y++) for (let x = 0; x < bW; x++) {
    const k = (comp.minY+y)*res.w + (comp.minX+x);
    if (res.label[k] === comp.id) { const o = (y*bW+x)*4; out.data[o]=26; out.data[o+1]=26; out.data[o+2]=26; out.data[o+3]=255; }
  }
  ctx.putImageData(out, 0, 0);
  return { imageData: out, thumb: cv.toDataURL() };
}

function detectCharFromPrepped(prepped) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const refFonts = ["'Roboto', sans-serif", "'Georgia', serif", "'Arial', sans-serif"];
  let best = null, bestScore = -1;
  for (const L of letters) for (const ch of [L, L.toLowerCase()]) {
    for (const rf of refFonts) for (const wt of [400, 700]) {
      const g = toGrid(renderGlyph(ch, rf, wt, OFFSCREEN_SIZE));
      if (!g) continue;
      const s = similarity(prepped, g);
      if (s > bestScore) { bestScore = s; best = ch; }
    }
  }
  return best;
}

async function compareGlyphsToFonts(glyphs, onProgress) {
  // glyphs: [{ prepped, char }]
  const results = [];
  const total = RENDER_CANDIDATES.length;
  for (let i = 0; i < total; i++) {
    const fontName = RENDER_CANDIDATES[i];
    onProgress && onProgress(i/total, fontName);
    await loadFont(fontName);
    for (const weight of [400, 700]) {
      let sum = 0, n = 0, fallbackHit = false;
      for (const g of glyphs) {
        const grid = toGrid(renderGlyph(g.char, `'${fontName}'`, weight, OFFSCREEN_SIZE));
        const fb = toGrid(renderGlyph(g.char, "serif", weight, OFFSCREEN_SIZE));
        if (!grid) continue;
        if (fb && chamfer(outline(binarize(grid,0.5)), outline(binarize(fb,0.5))) < 0.15) { fallbackHit = true; break; }
        sum += similarity(g.prepped, grid); n++;
      }
      if (fallbackHit || !n) continue;
      results.push({ fontName, weight, similarity: sum / n });
    }
  }
  const best = {};
  for (const r of results) if (!best[r.fontName] || r.similarity > best[r.fontName].similarity) best[r.fontName] = r;
  return Object.values(best).sort((a,b)=>b.similarity-a.similarity);
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────


// Runs animation exactly once per page load — module var resets on every hard load/refresh.
let _animPlayed = false;

function Logo({ isSearching }) {
  const [typed, setTyped] = useState(_animPlayed ? 4 : 0);
  const [done,  setDone]  = useState(_animPlayed);
  const [hover, setHover] = useState(false);
  const SK = ["s","k","e","t","c","h"];
  const SK_X = [4, 28, 56, 80, 100, 124];         // x of each letter in "sketch"
  const STEP = 0.16;                               // seconds between letters
  const WRITE_T = SK.length * STEP + 0.35;         // when handwriting finishes
  const FONT = [
    { ch: "F", font: "'Playfair Display', serif", fill: "#1a1a1a", size: 52, x: 218 },
    { ch: "O", font: "'Bebas Neue', sans-serif",  fill: "#e85d26", size: 52, x: 252 },
    { ch: "N", font: "'Lobster', cursive",         fill: "#1a1a1a", size: 48, x: 284 },
    { ch: "T", font: "'Space Mono', monospace",   fill: "#2d2d2d", size: 44, x: 324 },
  ];
  const CURSOR_X = [218, 252, 284, 324, 354];

  useEffect(() => {
    if (_animPlayed) return;
    let i = 0, iv;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++; setTyped(i);
        if (i >= FONT.length) {
          clearInterval(iv);
          setTimeout(() => {
            setDone(true);
            _animPlayed = true;
          }, 700);
        }
      }, 140);
    }, WRITE_T * 1000 + 150);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  // pencil path keyframes: follows the letters, then parks after "sketch"
  const pencilKeys = SK_X.map((x, i) => `${Math.round((i / SK.length) * 80)}% { transform: translate(${x + 14}px, 34px) rotate(-35deg); }`).join("\n");

  return (
    <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Bebas+Neue&family=Playfair+Display:wght@700&family=Lobster&family=Space+Mono:wght@700&display=swap');
        @keyframes sk-write { to { stroke-dashoffset: 0; } }
        @keyframes sk-fill  { to { fill-opacity: 1; } }
        @keyframes ul-draw  { to { stroke-dashoffset: 0; } }
        @keyframes pencil-travel {
          ${pencilKeys}
          88%  { transform: translate(172px, 26px) rotate(-35deg); }
          100% { transform: translate(168px, 28px) rotate(-35deg); }
        }
        @keyframes pencil-scribble {
          0%   { transform: translate(168px,28px) rotate(-35deg); }
          25%  { transform: translate(163px,32px) rotate(-42deg); }
          50%  { transform: translate(170px,30px) rotate(-30deg); }
          75%  { transform: translate(164px,27px) rotate(-40deg); }
          100% { transform: translate(168px,28px) rotate(-35deg); }
        }
        @keyframes blink { 50% { opacity: 0; } }
        .sk-letter {
          font-family: 'Caveat', cursive; font-size: 46px; font-weight: 700;
          fill: #2d2d2d; fill-opacity: 0;
          stroke: #2d2d2d; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 160; stroke-dashoffset: 160;
          animation: sk-write 0.42s ease-out forwards, sk-fill 0.15s linear forwards;
        }
        .ul { stroke-dasharray: 200; stroke-dashoffset: 200; animation: ul-draw 0.5s ease forwards; animation-delay: ${WRITE_T - 0.15}s; }
        .pencil { transform: translate(${SK_X[0] + 14}px, 34px) rotate(-35deg); animation: pencil-travel ${WRITE_T}s linear forwards; }
        .pencil.done { animation: none; transform: translate(168px,28px) rotate(-35deg); }
        .pencil.hover { animation: pencil-scribble 0.45s ease-in-out infinite; }
        .cursor { animation: blink 0.8s step-end infinite; }
      `}</style>

      <svg viewBox="0 0 480 76" width="480" height="76" style={{ maxWidth: "100%", overflow: "visible" }}>
        {SK.map((ch, i) => (
          <text key={i} className={_animPlayed ? undefined : "sk-letter"} x={SK_X[i]} y="52"
            style={_animPlayed
              ? { fontFamily: "'Caveat', cursive", fontSize: 46, fontWeight: 700, fill: "#2d2d2d" }
              : { animationDelay: `${i * STEP}s, ${i * STEP + 0.3}s` }}>{ch}</text>
        ))}

        <path className={_animPlayed ? undefined : "ul"} d="M 4 58 Q 45 63 85 60 Q 125 57 165 61 Q 180 62 188 59"
          stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>

        <text x="196" y="56" fontFamily="'Caveat', cursive" fontSize="28" fill="#999" opacity={_animPlayed ? 1 : 0}>
          {!_animPlayed && <animate attributeName="opacity" from="0" to="1" begin={`${WRITE_T}s`} dur="0.15s" fill="freeze" />}a
        </text>

        <g className={`pencil${(done || _animPlayed) && !isSearching && !hover ? " done" : ""}${hover || isSearching ? " hover" : ""}`}
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <rect x="-6" y="-6" width="20" height="38" fill="transparent" />
          <rect x="0" y="0" width="7" height="19" rx="1.5" fill="#f0c040" />
          <polygon points="0,19 7,19 3.5,26" fill="#e0a090" />
          <rect x="0" y="0" width="7" height="3.5" rx="1" fill="#999" />
          <rect x="0" y="17" width="7" height="2" fill="#d4a060" />
        </g>

        {FONT.map(({ ch, font, fill, size, x }, i) => (
          <text key={ch} x={x} y="57" fontFamily={font} fontSize={size} fontWeight="700" fill={fill}
            style={{ opacity: typed > i ? 1 : 0 }}>{ch}</text>
        ))}
        {!done && typed >= 0 && (
          <rect className="cursor" x={CURSOR_X[typed]} y="18" width="3" height="40" fill="#e85d26"
            style={{ opacity: typed === 0 && !hover ? 0.001 : 1 }} />
        )}
      </svg>

      <div style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.12em", marginTop: -2, textAlign: "center" }}>
        www.sketchafont.com
      </div>
    </div>
  );
}

export default function FontSketchMatcher() {
  const [letter, setLetter] = useState("A");
  const [isUpper, setIsUpper] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSketch, setHasSketch] = useState(false);
  const [matches, setMatches] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ pct: 0, font: "" });
  const [drawMode, setDrawMode] = useState("free");
  const [lineWidth, setLineWidth] = useState(3.5);
  const [fontTick, setFontTick] = useState(0);
  const [suggestedLetter, setSuggestedLetter] = useState(null);
  const [loaderFonts, setLoaderFonts] = useState([]);
  const canvasRef = useRef(null);
  const lastPos = useRef(null);
  const snapStart = useRef(null);
  const snapPreview = useRef(null);
  const analysisTimer = useRef(null);
  const loadedFontNames = useRef(new Set());
  const loaderInterval = useRef(null);
  const loadFontIfNeeded = useCallback((fontName) => {
    if (loadedFontNames.current.has(fontName)) return;
    loadedFontNames.current.add(fontName);
    const encoded = fontName.replace(/ /g, "+");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }, []);

  const fileInputRef = useRef(null);
  const [importNote, setImportNote] = useState("");
  const [imgGlyphs, setImgGlyphs] = useState([]);       // [{thumb, prepped, char}]
  const [imgMatches, setImgMatches] = useState([]);
  const [imgAnalyzing, setImgAnalyzing] = useState(false);
  const [imgProgress, setImgProgress] = useState({ pct: 0, font: "" });
  const [imgNote, setImgNote] = useState("");
  const imgFileRef = useRef(null);

  const importImageTool = useCallback(async (blob) => {
    try {
      setImgMatches([]); setImgNote("Reading image…");
      const img = await loadImageElement(blob);
      const res = imageToComponents(img);
      const comps = pickGlyphs(res);
      if (!comps.length) { setImgGlyphs([]); setImgNote("No letters found in that image."); return; }
      await loadFont("Roboto");
      const glyphs = comps.map(comp => {
        const { imageData, thumb } = componentToImageData(res, comp);
        const grid = toGrid(imageData);
        const prepped = prep(grid);
        return { thumb, prepped, char: detectCharFromPrepped(prepped) || "A" };
      });
      setImgGlyphs(glyphs);
      setImgNote(`Found ${glyphs.length} letter${glyphs.length>1?"s":""}. Fix any wrong guesses, then Match.`);
    } catch { setImgNote("Couldn't read that image."); }
  }, []);

  const runImageMatch = useCallback(async () => {
    if (!imgGlyphs.length) return;
    setImgAnalyzing(true); setImgMatches([]); setImgProgress({ pct: 0, font: "" });
    try {
      const out = await compareGlyphsToFonts(imgGlyphs, (pct, font) => setImgProgress({ pct: Math.round(pct*100), font }));
      const enriched = out.slice(0, 10).map(r => {
        const meta = GOOGLE_FONTS.find(f => f.name === r.fontName) || { name: r.fontName, category: "display", traits: {} };
        loadFontIfNeeded(r.fontName);
        return { ...meta, source: "google", weight: r.weight, pct: Math.min(99, Math.round(r.similarity*100)) };
      });
      setImgMatches(enriched);
      setTimeout(() => setFontTick(t=>t+1), 400);
      setTimeout(() => setFontTick(t=>t+1), 1200);
    } finally { setImgAnalyzing(false); setImgProgress({ pct: 0, font: "" }); }
  }, [imgGlyphs, loadFontIfNeeded]);

  const importImage = useCallback(async (blob) => {
    try {
      const img = await loadImageElement(blob);
      const res = imageToInk(img);
      if (!res) { setImportNote("No letter found in that image."); return; }
      paintInkToCanvas(res, canvasRef.current);
      snapPreview.current = null; snapStart.current = null;
      setHasSketch(true); setMatches([]); setSuggestedLetter(null);
      setImportNote("Imported the largest glyph from the image. Hit Match fonts.");
    } catch { setImportNote("Couldn't read that image."); }
  }, []);

  const importText = useCallback(async (html, plain) => {
    const text = (plain || "").trim();
    const firstChar = text.match(/[A-Za-z]/)?.[0];
    if (!firstChar) { setImportNote("No letters in the copied text."); return; }
    let family = null;
    const m = html && html.match(/font-family\s*:\s*([^;"]+)/i);
    if (m) family = m[1].trim().replace(/^['"]|['"]$/g, "").split(",")[0].trim().replace(/^['"]|['"]$/g, "");
    if (!family) { setImportNote(`Copied "${firstChar}" but no font info came with it — copy from a webpage, or paste an image.`); return; }
    const isGoogle = GOOGLE_FONTS.some(f => f.name.toLowerCase() === family.toLowerCase());
    if (isGoogle) await loadFont(family);
    const size = 400;
    const img = renderGlyph(firstChar, `'${family}'`, 400, size);
    const fallback = renderGlyph(firstChar, "serif", 400, size);
    const a = toGrid(img), b = toGrid(fallback);
    if (!a || (b && chamfer(outline(binarize(a,0.5)), outline(binarize(b,0.5))) < 0.15)) {
      setImportNote(`Font "${family}" isn't available on this machine, so its glyph can't be rendered.`); return;
    }
    const cv = document.createElement("canvas"); cv.width = size; cv.height = size;
    cv.getContext("2d").putImageData(img, 0, 0);
    const res = imageToInk(cv);
    if (!res) { setImportNote("Couldn't render that font."); return; }
    paintInkToCanvas(res, canvasRef.current);
    snapPreview.current = null; snapStart.current = null;
    const up = firstChar === firstChar.toUpperCase();
    setIsUpper(up); setLetter(firstChar.toUpperCase());
    setHasSketch(true); setMatches([]); setSuggestedLetter(null);
    setImportNote(isGoogle
      ? `Copied text is already in "${family}" (a Google Font). Rendered "${firstChar}" — Match to find relatives.`
      : `Rendered "${firstChar}" in "${family}". Hit Match fonts.`);
  }, []);

  useEffect(() => {
    const onPaste = (e) => {
      const items = e.clipboardData?.items || [];
      for (const it of items) {
        if (it.type.startsWith("image/")) { e.preventDefault(); importImageTool(it.getAsFile()); return; }
      }
      const html = e.clipboardData?.getData("text/html");
      const plain = e.clipboardData?.getData("text/plain");
      if (plain) { e.preventDefault(); importText(html, plain); }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [importImageTool, importText]);

  const displayChar = isUpper ? letter.toUpperCase() : letter.toLowerCase();


  // Loader font cycling — pick random fonts from RENDER_CANDIDATES
  useEffect(() => {
    if (analyzing) {
      const pick = () => {
        const shuffled = [...RENDER_CANDIDATES].sort(() => Math.random() - 0.5).slice(0, 6);
        setLoaderFonts(shuffled);
        shuffled.forEach(f => loadFontIfNeeded(f));
      };
      pick();
      loaderInterval.current = setInterval(pick, 1800);
    } else {
      clearInterval(loaderInterval.current);
    }
    return () => clearInterval(loaderInterval.current);
  }, [analyzing]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const snapPos = (start, current, mode) => {
    if (mode === "free") return current;
    const dx = current.x - start.x, dy = current.y - start.y;
    if (mode === "straight") return Math.abs(dx) > Math.abs(dy) ? { x: current.x, y: start.y } : { x: start.x, y: current.y };
    if (mode === "diagonal") {
      const dist = Math.sqrt(dx*dx+dy*dy), angle = Math.atan2(dy,dx);
      const snapped = Math.round(angle/(Math.PI/4))*(Math.PI/4);
      return { x: start.x+dist*Math.cos(snapped), y: start.y+dist*Math.sin(snapped) };
    }
    return current;
  };

  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current, pos = getPos(e, canvas);
    setIsDrawing(true); lastPos.current = pos; snapStart.current = pos;
    const ctx = canvas.getContext("2d");
    ctx.beginPath(); ctx.arc(pos.x, pos.y, lineWidth/2, 0, Math.PI*2);
    ctx.fillStyle = "#1a1a1a"; ctx.fill();
    setHasSketch(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current, ctx = canvas.getContext("2d"), rawPos = getPos(e, canvas);
    if (drawMode === "free") {
      ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(rawPos.x, rawPos.y);
      ctx.strokeStyle="#1a1a1a"; ctx.lineWidth=lineWidth; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke();
      lastPos.current = rawPos;
    } else {
      const snapped = snapPos(snapStart.current, rawPos, drawMode);
      if (snapPreview.current) { ctx.clearRect(0,0,canvas.width,canvas.height); ctx.putImageData(snapPreview.current,0,0); }
      ctx.beginPath(); ctx.moveTo(snapStart.current.x, snapStart.current.y); ctx.lineTo(snapped.x, snapped.y);
      ctx.strokeStyle="#1a1a1a"; ctx.lineWidth=lineWidth; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke();
    }
    if (analysisTimer.current) clearTimeout(analysisTimer.current);
  };

  const endDraw = (e) => {
    e.preventDefault();
    if (isDrawing && drawMode !== "free") {
      const canvas = canvasRef.current, ctx = canvas.getContext("2d");
      const snapped = snapPos(snapStart.current, getPos(e, canvas), drawMode);
      if (snapPreview.current) { ctx.clearRect(0,0,canvas.width,canvas.height); ctx.putImageData(snapPreview.current,0,0); }
      ctx.beginPath(); ctx.moveTo(snapStart.current.x, snapStart.current.y); ctx.lineTo(snapped.x, snapped.y);
      ctx.strokeStyle="#1a1a1a"; ctx.lineWidth=lineWidth; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke();
      snapPreview.current = ctx.getImageData(0,0,canvas.width,canvas.height);
      snapStart.current = snapped; lastPos.current = snapped;
    }
    setIsDrawing(false);
    if (analysisTimer.current) clearTimeout(analysisTimer.current);
  };

  const pendingLetter = useRef(null);

  const doMatch = useCallback(async (charOverride) => {
    const canvas = canvasRef.current;
    const char = charOverride || displayChar;
    setAnalyzing(true); setMatches([]); setProgress({ pct: 0, font: "" }); setSuggestedLetter(null);
    try {
      const glyphResults = await compareSketchToFonts(
        canvas, char,
        (pct, font) => setProgress({ pct: Math.round(pct*100), font })
      );
      const top10 = glyphResults.slice(0, 10);
      const enriched = top10.map(r => {
        const meta = GOOGLE_FONTS.find(f => f.name === r.fontName) || { name: r.fontName, category: "display", traits: {} };
        loadFontIfNeeded(r.fontName);
        return { ...meta, source: "google", similarity: r.similarity, weight: r.weight, pct: Math.min(99, Math.round(r.similarity * 100)) };
      });
      setMatches(enriched);
      setTimeout(() => setFontTick(t => t+1), 400);
      setTimeout(() => setFontTick(t => t+1), 1200);
    } finally {
      setAnalyzing(false); setProgress({ pct: 0, font: "" });
    }
  }, [displayChar, loadFontIfNeeded]);

  const runAnalysis = useCallback(async () => {
    const canvas = canvasRef.current;
    setSuggestedLetter(null);
    // Quick letter detection before full scan
    setProgress({ pct: 0, font: "detecting letter…" });
    await loadFont("Roboto");
    const candidates = await detectLetter(canvas, isUpper);
    // If top guess differs from selected letter and score is confident enough, ask
    const top = candidates[0];
    const topFive = candidates.filter(c => c.score > 0.15);
    if (top && top.letter !== letter && top.score > 0.38) {
      setSuggestedLetter(topFive.map(c => ({
        letter: c.letter,
        char: isUpper ? c.letter : c.letter.toLowerCase(),
        score: c.score,
      })));
      setProgress({ pct: 0, font: "" });
      return;
    }
    await doMatch();
  }, [letter, isUpper, doMatch]);

  const clearCanvas = () => {
    canvasRef.current.getContext("2d").clearRect(0,0,200,200);
    snapPreview.current=null; snapStart.current=null;
    setHasSketch(false); setMatches([]); setSuggestedLetter(null); setImportNote("");
  };

  const getFontStack = (font) => {
    const cat = font.category;
    const fallback = cat==="monospace"?"monospace":(cat==="serif"||font.traits?.hasSerif)?"serif":"sans-serif";
    return `'${font.name}', ${fallback}`;
  };

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Logo component

  // Loader with cycling font characters
  const Loader = () => {
    const chars = displayChar;
    const fontStyles = [
      { fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2d2d2d" },
      { fontFamily: "'Bebas Neue', sans-serif", color: "#e85d26" },
      { fontFamily: "'Caveat', cursive", fontWeight: 700, color: "#555" },
      { fontFamily: "'Lobster', cursive", color: "#2d2d2d" },
      { fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#666" },
      { fontFamily: "'Abril Fatface', serif", color: "#1a1a1a" },
    ];
    return (
      <div style={{ paddingTop: 4 }}>
        {/* Cycling font characters */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 14, height: 56, overflow: "hidden" }}>
          {loaderFonts.map((fontName, i) => {
            const style = fontStyles[i % fontStyles.length];
            const sizes = [28, 42, 36, 50, 32, 44];
            const rotations = [-3, 2, -1, 3, -2, 1];
            loadFontIfNeeded(fontName);
            return (
              <div key={`${fontName}-${i}`} style={{
                fontSize: sizes[i] || 36,
                fontFamily: `'${fontName}', ${style.fontFamily}`,
                fontWeight: style.fontWeight || 400,
                color: style.color,
                transform: `rotate(${rotations[i]}deg)`,
                transition: "all 0.4s ease",
                lineHeight: 1,
                userSelect: "none",
                opacity: 0.85,
              }}>
                {chars}
              </div>
            );
          })}
          <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-muted)", alignSelf: "center", fontStyle: "italic" }}>
            matching…
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ height: "100%", width: `${progress.pct}%`,
            background: "linear-gradient(90deg, #e85d26, #f0a060)",
            borderRadius: 3, transition: "width 0.25s" }} />
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
          {progress.font ? `rendering ${progress.font}…` : "loading fonts…"} {progress.pct}%
        </div>
        {/* Skeleton rows */}
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ height: 60, background: "var(--surface-1)", borderRadius: "var(--radius)", border: "0.5px solid var(--border)", marginBottom: 6, opacity: 1 - i * 0.14 }} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "1.5rem 2rem", fontFamily: "var(--font-sans)", maxWidth: 860, margin: "0 auto" }}>
      <Logo isSearching={analyzing || imgAnalyzing} />

      {/* Controls row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "flex-end", justifyContent: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Letter</div>
          <select value={letter} onChange={e => { setLetter(e.target.value); clearCanvas(); }}
            style={{ height: 36, borderRadius: "var(--radius)", border: "0.5px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--text-primary)", padding: "0 10px", fontSize: 14, cursor: "pointer" }}>
            {LETTERS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Case</div>
          <div style={{ display: "flex", border: "0.5px solid var(--border-strong)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {[true, false].map(u => (
              <button key={String(u)} onClick={() => { setIsUpper(u); clearCanvas(); }}
                style={{ padding: "0 16px", height: 36, border: "none", cursor: "pointer", fontSize: 14,
                  background: isUpper===u?"var(--border-strong)":"var(--surface-2)",
                  color: isUpper===u?"var(--text-primary)":"var(--text-secondary)",
                  fontWeight: isUpper===u?500:400 }}>
                {u ? "Aa" : "aa"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Stroke</div>
          <div style={{ display: "flex", border: "0.5px solid var(--border-strong)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {[{val:"free",label:"Free"},{val:"straight",label:"H/V"},{val:"diagonal",label:"45°"}].map(({val,label}) => (
              <button key={val} onClick={() => setDrawMode(val)}
                style={{ padding: "0 12px", height: 36, border: "none", cursor: "pointer", fontSize: 13,
                  background: drawMode===val?"var(--border-strong)":"var(--surface-2)",
                  color: drawMode===val?"var(--text-primary)":"var(--text-secondary)",
                  fontWeight: drawMode===val?500:400 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Width — {lineWidth}px</div>
          <div style={{ display: "flex", border: "0.5px solid var(--border-strong)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {[{val:2,label:"Thin"},{val:4,label:"Med"},{val:8,label:"Thick"},{val:14,label:"Bold"}].map(({val,label}) => (
              <button key={val} onClick={() => setLineWidth(val)}
                style={{ padding: "0 10px", height: 36, border: "none", cursor: "pointer", fontSize: 13,
                  background: lineWidth===val?"var(--border-strong)":"var(--surface-2)",
                  color: lineWidth===val?"var(--text-primary)":"var(--text-secondary)",
                  fontWeight: lineWidth===val?500:400 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 12, color: "transparent", marginBottom: 5 }}>_</div>
            <button onClick={clearCanvas}
              style={{ height: 36, padding: "0 14px", borderRadius: "var(--radius)", border: "0.5px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer" }}>
              Clear
            </button>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "transparent", marginBottom: 5 }}>_</div>
            <button onClick={() => hasSketch && !analyzing && runAnalysis()} disabled={!hasSketch || analyzing}
              style={{ height: 36, padding: "0 16px", borderRadius: "var(--radius)",
                border: "1.5px solid #e85d26",
                background: hasSketch && !analyzing ? "#e85d26" : "var(--surface-1)",
                color: hasSketch && !analyzing ? "#fff" : "var(--text-muted)",
                fontSize: 13, cursor: hasSketch && !analyzing ? "pointer" : "default", fontWeight: 600 }}>
              {analyzing ? `${progress.pct}%` : "Match fonts ↗"}
            </button>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Canvas */}
        <div style={{ flex: "0 0 auto" }}>
          <div style={{ position: "relative", border: "1.5px solid var(--border-strong)", borderRadius: 14, overflow: "hidden", background: "#fff", width: 210, height: 210, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            {!hasSketch && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", pointerEvents: "none", gap: 6 }}>
                <span style={{ fontSize: 80, color: "#ebebeb", fontWeight: 700, lineHeight: 1, userSelect: "none", fontFamily: "Georgia, serif" }}>{displayChar}</span>
                <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.05em" }}>draw here</span>
              </div>
            )}
            <canvas ref={canvasRef} width={210} height={210}
              style={{ display: "block", width: "100%", height: "100%", cursor: drawMode==="free"?"crosshair":"cell", touchAction: "none" }}
              onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
              onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw} />
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 7, textAlign: "center" }}>
            {drawMode==="free"?"free draw":drawMode==="straight"?"H/V snap":"45° snap"} · {RENDER_CANDIDATES.length} fonts
          </div>
          <div style={{ fontSize: 11, color: importNote ? "#e85d26" : "var(--text-muted)", marginTop: 4, textAlign: "center", maxWidth: 210 }}>
            {importNote || "or paste (Ctrl+V) text copied from a webpage"}
          </div>
        </div>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 260 }}>
          {/* Which letter is this? multi-choice */}
          {suggestedLetter && !analyzing && (
            <div style={{ marginBottom: 14, padding: "16px", background: "#fff8f5",
              border: "1.5px solid #e85d26", borderRadius: "var(--radius)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 12 }}>
                Which letter did you draw?
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {suggestedLetter.map((opt, i) => (
                  <button key={opt.letter} onClick={() => { setLetter(opt.letter); doMatch(opt.char); }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center",
                      padding: "10px 14px", borderRadius: "var(--radius)", cursor: "pointer",
                      border: i === 0 ? "2px solid #e85d26" : "1.5px solid var(--border-strong)",
                      background: i === 0 ? "#e85d26" : "var(--surface-2)",
                      color: i === 0 ? "#fff" : "var(--text-primary)",
                      minWidth: 56, transition: "all 0.15s" }}>
                    <span style={{ fontSize: 32, fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1 }}>
                      {opt.char}
                    </span>
                  </button>
                ))}
                <button onClick={() => { setSuggestedLetter(null); doMatch(null); }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center",
                    padding: "10px 14px", borderRadius: "var(--radius)", cursor: "pointer",
                    border: "1.5px dashed var(--border-strong)", background: "transparent",
                    color: "var(--text-muted)", minWidth: 56 }}>
                  <span style={{ fontSize: 32, fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1 }}>
                    {isUpper ? letter : letter.toLowerCase()}
                  </span>
                  <span style={{ fontSize: 10, marginTop: 4 }}>keep</span>
                </button>
              </div>
              <div style={{ fontSize: 11, color: "#aaa" }}>
                Pick the letter you drew, or keep your original
              </div>
            </div>
          )}

          {!suggestedLetter && !analyzing && matches.length === 0 && !hasSketch && (
            <div style={{ fontSize: 14, color: "var(--text-muted)", paddingTop: 12, lineHeight: 1.6 }}>
              Draw a letter in the box, then hit <strong style={{color:"#e85d26"}}>Match fonts</strong>.<br/>
              <span style={{ fontSize: 12 }}>Compares your sketch against {RENDER_CANDIDATES.length} real rendered glyphs — no AI, no server.</span>
            </div>
          )}
          {!suggestedLetter && !analyzing && matches.length === 0 && hasSketch && (
            <div style={{ fontSize: 14, color: "var(--text-muted)", paddingTop: 12 }}>
              Hit <strong style={{color:"#e85d26"}}>Match fonts</strong> when ready.
            </div>
          )}
          {analyzing && <Loader />}
          {!analyzing && matches.map((font, i) => (
            <div key={`${font.name}-${fontTick}`} style={{ display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", marginBottom: 6,
              background: "var(--surface-1)", borderRadius: "var(--radius)",
              border: i===0 ? "1px solid #e85d26" : "0.5px solid var(--border)",
              boxShadow: i===0 ? "0 0 0 1px #e85d2611" : "none" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: i===0?"#e85d26":"var(--text-muted)", minWidth: 18, textAlign: "right" }}>{i+1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{font.name}</span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", flexShrink: 0 }}>GF · {font.weight===700?"bold":"regular"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${font.pct}%`,
                      background: i===0?"#e85d26":font.pct>60?"#f0a060":"var(--border-strong)",
                      borderRadius: 2, transition: "width 0.4s" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)", minWidth: 30, textAlign: "right", fontWeight: i===0?600:400 }}>{font.pct}%</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{font.category}</div>
              </div>
              <div style={{ fontSize: 44, lineHeight: 1, fontFamily: getFontStack(font),
                fontWeight: font.weight||400, color: "var(--text-primary)", minWidth: 50, textAlign: "center" }}>
                {displayChar}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IMAGE FONT TOOL ── */}
      <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Match a font from an image</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            Paste a screenshot of text (Ctrl+V) or upload one. Every letter found is matched together.
          </div>
        </div>

        <input ref={imgFileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) importImageTool(f); e.target.value = ""; }} />

        <div onClick={() => imgFileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) importImageTool(f); }}
          style={{ margin: "0 auto", maxWidth: 560, minHeight: 96, border: "1.5px dashed var(--border-strong)", borderRadius: 14,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 16,
            cursor: "pointer", background: "var(--surface-1)" }}>
          {imgGlyphs.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Ctrl+V a screenshot here · click to upload · or drop a file</div>
          ) : (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }} onClick={e => e.stopPropagation()}>
              {imgGlyphs.map((g, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 44, height: 44, background: "#fff", border: "0.5px solid var(--border)", borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src={g.thumb} alt="" style={{ maxWidth: 36, maxHeight: 36, imageRendering: "auto" }} />
                  </div>
                  <input value={g.char} maxLength={1}
                    onChange={e => { const v = e.target.value.replace(/[^A-Za-z]/g,"").slice(-1); if (!v) return;
                      setImgGlyphs(gs => gs.map((x, j) => j === i ? { ...x, char: v } : x)); }}
                    style={{ width: 30, height: 26, textAlign: "center", fontSize: 14, fontWeight: 600,
                      border: "0.5px solid var(--border-strong)", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-primary)" }} />
                </div>
              ))}
            </div>
          )}
          {imgNote && <div style={{ fontSize: 11, color: "#e85d26" }}>{imgNote}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <button onClick={() => { setImgGlyphs([]); setImgMatches([]); setImgNote(""); }}
            style={{ height: 36, padding: "0 14px", borderRadius: "var(--radius)", border: "0.5px solid var(--border-strong)", background: "var(--surface-2)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer" }}>
            Clear
          </button>
          <button onClick={runImageMatch} disabled={!imgGlyphs.length || imgAnalyzing}
            style={{ height: 36, padding: "0 16px", borderRadius: "var(--radius)", border: "1.5px solid #e85d26",
              background: imgGlyphs.length && !imgAnalyzing ? "#e85d26" : "var(--surface-1)",
              color: imgGlyphs.length && !imgAnalyzing ? "#fff" : "var(--text-muted)",
              fontSize: 13, cursor: imgGlyphs.length && !imgAnalyzing ? "pointer" : "default", fontWeight: 600 }}>
            {imgAnalyzing ? `${imgProgress.pct}%` : "Match fonts ↗"}
          </button>
        </div>

        <div style={{ maxWidth: 560, margin: "16px auto 0" }}>
          {imgAnalyzing && (
            <div>
              <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${imgProgress.pct}%`, background: "linear-gradient(90deg, #e85d26, #f0a060)", borderRadius: 3, transition: "width 0.25s" }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{imgProgress.font ? `rendering ${imgProgress.font}…` : "loading…"}</div>
            </div>
          )}
          {!imgAnalyzing && imgMatches.map((font, i) => (
            <div key={`img-${font.name}-${fontTick}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", marginBottom: 6,
              background: "var(--surface-1)", borderRadius: "var(--radius)", border: i===0 ? "1px solid #e85d26" : "0.5px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: i===0?"#e85d26":"var(--text-muted)", minWidth: 18, textAlign: "right" }}>{i+1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
                  <span className="font-name" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{font.name}</span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>GF · {font.weight===700?"bold":"regular"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${font.pct}%`, background: i===0?"#e85d26":font.pct>60?"#f0a060":"var(--border-strong)", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)", minWidth: 30, textAlign: "right" }}>{font.pct}%</span>
                </div>
              </div>
              <div style={{ fontSize: 26, lineHeight: 1, fontFamily: getFontStack(font), fontWeight: font.weight||400, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                {imgGlyphs.map(g => g.char).join("")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}