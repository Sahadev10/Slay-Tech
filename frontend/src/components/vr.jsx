import React from "react";

const Vr = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Fullscreen iframe */}
      <iframe
        src="https://weshopai-weshopai-virtual-try-on.hf.space"
        frameBorder="0"
        className="w-full h-full"
      ></iframe>

      {/* Taller black bar with centered title */}
      <div className="absolute top-0 left-0 w-full h-60 bg-black text-white z-10 flex items-center  justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">Virtual Try On</div>
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">Slay in your own style</div>
        </div>
      </div>
    </div>
  );
};

export default Vr;
