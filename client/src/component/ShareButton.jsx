import { useState, useCallback } from "react";
import { FaShare } from "react-icons/fa";
import sound from "../assets/copy-sound.mp3";

const ShareButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);

      if (isCopied) {
        const audio = new Audio(sound);
        audio.play();
      }

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <div className="absolute rounded-full flex justify-center items-center cursor-pointer 2 w-10 h-10 z-10 bg-slate-100 top-[20%] right-[3%]">
      <FaShare
        onClick={handleShare}
        className="text-slate-600"
        title={isCopied ? "Copied" : "Copy"}
      />
    </div>
  );
};

export default ShareButton;
