import { generateId } from "../generateId";

export const generateInputId = () => {
  return generateId({
    length: 5,
    specialCharacters: "-_",
  });
};

export const useInputId = (identifier?: string): string => {
  return identifier || generateInputId();
};
