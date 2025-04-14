"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react"; // Import useCallback
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Start Dragging ---
  // Use useCallback to prevent unnecessary re-creation on re-renders
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []); // No dependencies needed

  // --- Stop Dragging ---
  // Use useCallback
  const handleDragEnd = useCallback(() => {
    // Check if we were actually dragging before setting state
    // This prevents unnecessary state updates if mouseup/touchend
    // happens without a preceding mousedown/touchstart on the handle
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]); // Depends on isDragging to avoid stale closure issue inside the check

  // --- Handle Mouse Movement ---
  // Use useCallback
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Only run if dragging AND container exists
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;

      // Ensure containerWidth is not zero to avoid division by zero
      if (containerWidth === 0) return;

      // Calculate position, clamped between 0 and 100
      const newPosition = Math.min(
        Math.max((x / containerWidth) * 100, 0),
        100
      );
      setSliderPosition(newPosition);
    },
    [isDragging]
  ); // Depends on isDragging

  // --- Handle Touch Movement ---
  // Use useCallback
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      // *** FIX: Only run if dragging AND container exists ***
      if (!isDragging || !containerRef.current) return;

      // Check if there's at least one touch point
      if (e.touches.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Use the first touch point
      const x = e.touches[0].clientX - rect.left;
      const containerWidth = rect.width;

      // Ensure containerWidth is not zero
      if (containerWidth === 0) return;

      // Calculate position, clamped between 0 and 100
      const newPosition = Math.min(
        Math.max((x / containerWidth) * 100, 0),
        100
      );
      setSliderPosition(newPosition);
    },
    [isDragging]
  ); // Depends on isDragging

  // --- Effect for Global Event Listeners ---
  useEffect(() => {
    // Add listeners to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
    // Use passive: true for touchmove for potential performance improvement
    // if preventDefault() is not needed (which it isn't here).
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleDragEnd);
    document.addEventListener("touchcancel", handleDragEnd); // Handle cancelled touches too

    // Cleanup function to remove listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("touchcancel", handleDragEnd);
    };
    // Re-run the effect if the handler functions change (due to useCallback dependencies)
  }, [handleMouseMove, handleTouchMove, handleDragEnd]);

  // --- Handle Keyboard Navigation ---
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 1, 100));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden shadow-xl rounded-lg ${className} touch-none select-none`} // Add touch-none and select-none
      aria-label="Image comparison slider"
      style={{
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
      }} // Ensure text selection is disabled
    >
      {/* Before Image (Bottom Layer) - Swapped logic for clarity */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage.src || "/placeholder.svg"} // Show BEFORE image fully
          alt={beforeImage.alt}
          fill
          style={{ objectFit: "cover" }}
          priority
          draggable={false} // Prevent image dragging
        />
      </div>

      {/* After Image (Top Layer with clip) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`, // Clip AFTER image from the left
        }}
      >
        <Image
          src={afterImage.src || "/placeholder.svg"} // Show AFTER image clipped
          alt={afterImage.alt}
          fill
          style={{ objectFit: "cover" }}
          priority
          draggable={false} // Prevent image dragging
        />
      </div>

      {/* Slider Control Line (Visual Guide & Accessibility Target) */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          // NOTE: Event listeners are moved to the handle below
        }}
        // Keep accessibility attributes here on the logical slider element
        tabIndex={0}
        role="slider"
        aria-label="Comparison slider handle"
        aria-controls="image-comparison-container"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKeyDown}
      >
        {/* Handle Visual Element & Interaction Target */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-ew-resize" // Ensure cursor is set here too
          // *** FIX: Move listeners here and remove pointer-events-none ***
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* SVG Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700"
            aria-hidden="true"
          >
            <path
              d="M8.5 18.5L3 12M3 12L8.5 5.5M3 12H21M15.5 5.5L21 12M21 12L15.5 18.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Add an ID for aria-controls */}
      <div id="image-comparison-container" className="sr-only">
        Image Comparison Container
      </div>
    </div>
  );
}
