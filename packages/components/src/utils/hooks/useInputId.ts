import { useEffect, useState } from "react";
import { generateId } from "../generateId";

export const useInputId = (identifier?: string): string => {
  const [id, setId] = useState(identifier || "");

  useEffect(() => {
    if (!id) {
      setId(
        generateId({
          length: 5,
          specialCharacters: "-_",
        })
      );
    }
  }, [id]);

  return id;
};
