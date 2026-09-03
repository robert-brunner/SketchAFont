# Sketch-A-Font

**[www.sketchafont.com](https://www.sketchafont.com)**

![Sketch-A-Font screenshot](sketchDemo.png)

Draw a letter by hand and find the closest matching Google Fonts — or paste a screenshot of text and identify the font from the image. Everything runs in your browser. No account, no API key, no cost.

---

## Sketch a letter

Draw in the canvas, pick your letter and case, then hit **Match fonts**. Your sketch is compared directly against rendered glyph outlines using chamfer distance — a shape-aware comparison that measures how far each stroke is from the nearest stroke on the other shape. The closest fonts rise to the top with a similarity score.

Use **H/V** or **45°** snap modes for cleaner strokes, and adjust stroke width with the Thin / Med / Thick / Bold buttons.

---

## Match from an image

Paste a screenshot of text (Ctrl+V) or upload an image. The tool finds the letters, lets you toggle which ones to include and correct any misidentified characters, then matches all selected letters together against the font library. Multi-letter matching is more accurate than single-letter.

---

## How matching works

No AI is involved. The tool loads each candidate font from Google Fonts, renders the relevant glyph to a canvas, extracts its outline, and computes the structural distance between that outline and your input. Nothing leaves your browser.

---

MIT License