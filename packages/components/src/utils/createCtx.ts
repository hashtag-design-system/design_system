import React from "react";

export const createCtx = <T extends {} | null>(defaultValues?: T) => {
  const ctx = React.createContext<T | undefined>(defaultValues);
  function useCtx<U extends {} | undefined = undefined>() {
    const c = React.useContext<U extends undefined ? T : U>(ctx as any);
    if (c === undefined) {
      throw new Error("useCtx must be inside a Provider with a value");
    }
    return c;
  }
  return [ctx.Provider, useCtx] as const;
};
