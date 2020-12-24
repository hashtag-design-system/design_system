// https://stackoverflow.com/a/54246501/13142787
export const snakeCase = (str: string): string => {
  const res = str[0].toLocaleLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return res;
};

export const kebabCase = (str: string): string => {
  const res = str[0].toLocaleLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  return res;
};