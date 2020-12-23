import { useEffect, useState } from "react";
import { generateId } from "../generateId";

export const generateInputId = () => {
  return generateId({
    length: 5,
    specialCharacters: "-_",
  });
};

export const useInputId = (identifier?: string): string => {
  const [id, setId] = useState(identifier || "");

  useEffect(() => {
    if (!id) {
      setId(generateInputId());
    }
  }, [id]);

  return id;
};
