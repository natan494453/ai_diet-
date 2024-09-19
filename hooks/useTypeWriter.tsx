import { useState, useEffect } from "react";

export const useTypeWriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    const debouncedTyping = setTimeout(() => {
      setDisplayText((prevText) =>
        text.length > prevText.length
          ? prevText + text.charAt(prevText.length)
          : prevText
      );
    }, speed);

    return () => clearTimeout(debouncedTyping);
  }, [text, displayText, speed]);

  return displayText;
};
