import React from "react";

// https://stackoverflow.com/a/54246501/13142787
export const snakeCase = (str: string): string => {
  const res = str[0].toLocaleLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return res;
};

export const kebabCase = (str: string): string => {
  const res = str[0].toLocaleLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  return res;
};

export const stringifyChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children)
    .map(child => {
      if (typeof child === "object") {
        if ((child as React.ReactElement).props.children.length > 0) {
          return (child as React.ReactElement).props.children;
        } else {
          return ((child as React.ReactElement).props.children as React.ReactElement[]).map(child => {
            if (typeof child === "object") {
              return child.props.children;
            } else {
              return (child as HTMLElement).textContent || (child as HTMLElement).innerText;
            }
          });
        }
      }
      return child;
    })
    .join(" ");
};
