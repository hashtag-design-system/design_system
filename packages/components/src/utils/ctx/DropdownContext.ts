import React from "react";

type DropdownContextType = {
  isOpen: boolean;
  options: string[];
  setOptions?: (options: string[]) => Set<string[]>;
};

const DropdownContext = React.createContext<any>({});

export default DropdownContext;
