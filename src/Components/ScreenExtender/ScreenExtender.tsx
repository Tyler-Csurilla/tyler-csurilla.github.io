import React, { useEffect, useRef, useState } from "react";
import "./ScreenExtender.css";

interface ScreenExtenderProps {
  className?: string;
  style?: React.CSSProperties;
  minHeight?: number; // Minimum height to show
}

/**
 * A component that fills the remaining space to the bottom of the viewport.
 * If the page content already extends beyond the viewport, this component won't be visible.
 */
const ScreenExtender: React.FC<ScreenExtenderProps> = ({
  className,
  style,
  minHeight = 0,
}) => {
  const [height, setHeight] = useState<number>(0);
  const extenderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (!extenderRef.current) return;

      // Get the bounding rect of the component
      const rect = extenderRef.current.getBoundingClientRect();

      // Calculate how much space is needed to reach the bottom of the viewport
      const spaceToBottom = window.innerHeight - rect.top;

      // Use max to ensure we don't go below minHeight if specified
      const calculatedHeight = Math.max(spaceToBottom, minHeight);

      // Update height state
      setHeight(Math.max(0, calculatedHeight));
    };

    const timer = setTimeout(() => {
      calculateHeight();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [minHeight]);

  return (
    <div
      ref={extenderRef}
      className={`screen-extender ${className || ""}`}
      style={{
        height: `${height}px`,
        minHeight: minHeight ? `${minHeight}px` : undefined,
        ...style,
      }}
    />
  );
};

export default ScreenExtender;
