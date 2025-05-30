import { useState, useEffect } from "react";

function ScreenSize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenLabel, setScreenLabel] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      let label = "";
      if (width < 640) label = "xs";
      else if (width < 768) label = "sm";
      else if (width < 1024) label = "md";
      else if (width < 1280) label = "lg";
      else if (width < 1536) label = "xl";
      else label = "2xl";

      setScreenLabel(label);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 bg-green-600 p-2 text-sm text-white">
      {screenWidth}px - {screenLabel}
    </div>
  );
}

export default ScreenSize;
