"use client";

import { BiSolidBowlHot, BiSolidBowlRice, BiSolidCookie } from "react-icons/bi";

const Loading = () => {
  const icons = [BiSolidBowlHot, BiSolidBowlRice, BiSolidCookie];

  return (
    <div className="flex items-center gap-2">
      {icons.map((Icon, i) => (
        <Icon
          key={i}
          size={28}
          className="text-accent fill-accent"
          style={{
            animation: "pulse-dot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(0.55); opacity: 0.35; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
