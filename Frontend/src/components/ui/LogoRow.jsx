import React from "react";

const LogoRow = ({ logos }) => (
  <div className="flex gap-20 md:gap-28 px-8 md:px-24 -translate-x-6 md:-translate-x-12 select-none">
    <div className="w-[60px] md:w-[120px]" />
    {logos.map((logo, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center w-[100px] md:w-[160px] opacity-90 hover:opacity-100 transition-opacity  cursor-help"
      >
        <div className="text-white mb-2 md:mb-3">
          {React.cloneElement(logo.icon, {
            size: window.innerWidth < 768 ? 50 : 80,
          })}
        </div>
        <p className="text-white text-lg md:text-2xl font-mono font-light text-center whitespace-nowrap">
          {logo.name}
        </p>
      </div>
    ))}
    <div className="w-[60px] md:w-[120px]" />
  </div>
);

export default LogoRow;
