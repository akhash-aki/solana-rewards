import { useState } from "react";
import Image from "next/image";

const LogoWithCursorEffect = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Adjust the offset range for subtle movement
    setOffset({
      x: x / 10, // Divide by a factor to make the movement subtle
      y: y / 10,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 }); // Reset position when the mouse leaves
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className="absolute top-0 w-full flex justify-center items-center mt-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className={`transition-transform duration-200 ease-out ${
          isHovered ? "scale-110" : ""
        }`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />
    </div>
  );
};

export default LogoWithCursorEffect;
