import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/[65%] backdrop-blur-[2px] px-6 xl:px-0 z-[1000]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] bg-[#eee] rounded flex flex-col items-center gap-3 p-8 shadow-lg backdrop-blur-lg">
        <h2 className="text-xl  text-center lg:leading-loose font-Playfair text-pretty font-semibold text-black">
          A verification link has been sent to your email address.
        </h2>
        <p className="text-center leading-relaxed lg:leading-loose font-Playfair text-sm text-pretty font-semibold text-zinc-700">
          A verification link has been sent to your email address. kindly review
          your email inbox to finish the registration process.
        </p>
        <div className="w-[250px] mt-6">
          <button className="btn_main w-full" onClick={() => onClose()}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
