import React, { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoIosDoneAll } from "react-icons/io";
import { toast } from "react-toastify";

const CopyToClipboardButton = ({ address }) => {
  const textAreaRef = useRef(null);
  const [showDoneIcon, setShowDoneIcon] = useState(false);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      setShowDoneIcon(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => {
        setShowDoneIcon(false);
      }, 2000);
    }
  };

  return (
    <>
      <textarea
        ref={textAreaRef}
        defaultValue={address}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
      <button onClick={copyToClipboard} className="text-[1rem]">
        {showDoneIcon ? <IoIosDoneAll /> : <FaRegCopy />}
      </button>
    </>
  );
};

export default CopyToClipboardButton;
