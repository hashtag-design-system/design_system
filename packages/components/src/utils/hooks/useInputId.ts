import { useEffect, useState } from "react";
import { generateId } from "@the_hashtag/common";

export const generateInputId = () => {
  const res = generateId({
    length: 5,
    specialCharacters: "-_",
  });
  try {
    if (document.getElementById(res) !== null) {
      generateInputId();
    }
  } catch {
    generateInputId();
  }
  return res;
};

export const useInputId = (identifier?: string): string => {
  const [res, setRes] = useState(identifier || "");

  useEffect(() => {
    if (!res || res === "") {
      setRes(generateInputId());
    }
  }, [res]);

  return res;
};
