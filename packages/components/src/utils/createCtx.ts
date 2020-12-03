import React from "react";

export const createCtx = <T extends {} | null>() => {
  const ctx = React.createContext<T | undefined>(undefined);
  function useCtx() {
    const c= React.useContext(ctx);
    if (c === undefined) {
      throw new Error("useCtx must be inside a Provider with a value");
    }
    return c;
  }
  return [useCtx, ctx.Provider] as const;
} 