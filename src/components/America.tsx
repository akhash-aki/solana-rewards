import { useState } from "react";
import Image from "next/image";

const America = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Adjust the offset range for subtle movement
    setOffset({
      x: x / 20, // Divide by a factor to make the movement subtle
      y: y / 20,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 }); // Reset position when the mouse leaves
  };

  return (
    <div
      className="absolute top-0 w-full flex justify-center items-center mt-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src="/peter.jpg"
        alt="america"
        width={200}
        height={200}
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />
    </div>
  );
};

export default America;
