import React from "react";

const Vr = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <iframe
        src="https://kwai-kolors-kolors-virtual-try-on.hf.space"
        frameBorder="0"
        width="850"
        height="450"
        className="rounded-lg shadow-lg"
        title="Virtual Try-On Interface"
      ></iframe>
    </div>
  );
};

export default Vr;
