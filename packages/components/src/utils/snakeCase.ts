// https://stackoverflow.com/a/54246501/13142787
export const snakeCase = (str: string): string => {
  const res = str[0].toLocaleLowerCase() + str.slice(1, str.length).replaceAll(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  return res;
};
